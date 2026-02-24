"use client"

import React from "react"
import { savePendingOrder, removePendingOrder } from "./pending-orders"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Copy, Check, Loader2, QrCode, AlertCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

interface PixCheckoutProps {
  amount: number
  items: Array<{ name: string; quantity: number; price: number }>
  onClose: () => void
  onSuccess: () => void
}

interface CustomerData {
  name: string
  email: string
  document: string
  phone: string
}

interface AddressData {
  city: string
  neighborhood: string
  street: string
  number: string
  cep: string
  complement: string
}

export function PixCheckout({ amount, items, onClose, onSuccess }: PixCheckoutProps) {
  const [step, setStep] = useState<"form" | "address" | "loading" | "qrcode" | "success" | "error">("form")
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    document: "",
    phone: "",
  })
  const [addressData, setAddressData] = useState<AddressData>({
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    cep: "",
    complement: "",
  })
  const [pixData, setPixData] = useState<{
    pixCode: string
    pixQrCodeImage?: string
    transactionId: string
  } | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [loadingCep, setLoadingCep] = useState(false)

  // Buscar endereco pelo CEP usando ViaCEP
  const fetchAddressByCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "")
    if (cleanCep.length !== 8) return

    setLoadingCep(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await response.json()
      
      if (data && !data.erro) {
        setAddressData(prev => ({
          ...prev,
          city: data.localidade || "",
          neighborhood: data.bairro || "",
          street: data.logradouro || "",
          cep: cep,
        }))
      }
    } catch {
      // Fallback silencioso
    } finally {
      setLoadingCep(false)
    }
  }

  const formatDocument = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      // CPF: 000.000.000-00
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    } else {
      // CNPJ: 00.000.000/0000-00
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
    }
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!customerData.name || !customerData.email || !customerData.document || !customerData.phone) {
      setError("Preencha todos os campos")
      return
    }

    setError("")
    setStep("address")
  }

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!addressData.city || !addressData.neighborhood || !addressData.street || !addressData.number || !addressData.cep) {
      setError("Preencha todos os campos do endereco")
      return
    }

    setStep("loading")
    setError("")

    try {
      const response = await fetch("/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          customerName: customerData.name,
          customerEmail: customerData.email,
          customerDocument: customerData.document,
          customerPhone: customerData.phone,
          items: items.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar PIX")
      }

      const newPixData = {
        pixCode: data.pixCode || "",
        pixQrCodeImage: data.pixQrCodeImage || "",
        transactionId: data.transactionId || "",
      }
      setPixData(newPixData)
      setStep("qrcode")

      // Salvar pedido pendente no localStorage
      savePendingOrder({
        transactionId: newPixData.transactionId,
        pixCode: newPixData.pixCode,
        pixQrCodeImage: newPixData.pixQrCodeImage,
        amount,
        items,
        customerName: customerData.name,
        createdAt: new Date().toISOString(),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar pagamento")
      setStep("error")
    }
  }

  const copyPixCode = async () => {
    if (pixData?.pixCode) {
      await navigator.clipboard.writeText(pixData.pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // ============================================
  // POLLING - Verificacao automatica de pagamento
  // ============================================
  const hasDispatchedEvent = useRef(false)

  const handlePaymentConfirmed = useCallback(() => {
    if (hasDispatchedEvent.current) return
    hasDispatchedEvent.current = true

    // Remove pedido pendente
    if (pixData?.transactionId) {
      removePendingOrder(pixData.transactionId)
    }

    // Dispara todos os eventos de conversao APENAS apos confirmacao do gateway
    if (typeof window !== "undefined") {
      const transactionId = pixData?.transactionId || ""

      // 1. dataLayer - Google Tag Manager
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "compra_aprovada",
        transaction_id: transactionId,
        value: amount,
        currency: "BRL",
      })

      // 2. Google Ads - Evento de Conversao
      if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-17934359668/b5kPCJ_O3_gbEPS44udC",
          value: amount,
          currency: "BRL",
          transaction_id: transactionId,
        })
      }

      // 3. Facebook Pixel - Evento de Purchase
      if (window.fbq) {
        window.fbq("track", "Purchase", {
          value: amount,
          currency: "BRL",
          content_type: "product",
          contents: items.map((item, index) => ({
            id: `product_${index}`,
            quantity: item.quantity,
            item_price: item.price,
          })),
          num_items: items.reduce((acc, item) => acc + item.quantity, 0),
        })
      }
    }

    // Mostrar tela de sucesso
    setStep("success")
  }, [pixData, amount, items])

  useEffect(() => {
    if (step !== "qrcode" || !pixData?.transactionId) return

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`/api/verificar-status?pedido_id=${pixData.transactionId}`)
        const data = await response.json()

        if (data.status === "Pago") {
          clearInterval(intervalId)
          handlePaymentConfirmed()
        }
      } catch (err) {
        console.error("[v0] Polling error:", err)
      }
    }, 5000) // Verifica a cada 5 segundos

    return () => clearInterval(intervalId)
  }, [step, pixData?.transactionId, handlePaymentConfirmed])

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ minHeight: '100dvh' }}>
      <div className="fixed inset-0 z-[70] bg-black/60 animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative z-[71] bg-card rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 max-h-[90dvh] max-h-[90svh] overflow-y-auto safari-scroll">
        {/* Header */}
        <div className="bg-primary p-5 text-primary-foreground">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Pagamento PIX</h2>
              <p className="text-sm text-primary-foreground/80">
                Total: R$ {amount.toFixed(2).replace(".", ",")}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "form" && (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Preencha seus dados para gerar o QR Code PIX
              </p>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nome completo</label>
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">E-mail</label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Telefone</label>
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => {
                    const numbers = e.target.value.replace(/\D/g, "")
                    let formatted = numbers
                    if (numbers.length <= 10) {
                      formatted = numbers.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
                    } else {
                      formatted = numbers.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2")
                    }
                    setCustomerData(prev => ({ ...prev, phone: formatted }))
                  }}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">CPF ou CNPJ</label>
                <input
                  type="text"
                  value={customerData.document}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, document: formatDocument(e.target.value) }))}
                  placeholder="000.000.000-00"
                  maxLength={18}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base font-semibold
                  hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <MapPin className="w-5 h-5" />
                Continuar para endereco
              </Button>
            </form>
          )}

          {step === "address" && (
            <form onSubmit={handleSubmitAddress} className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Digite o CEP para preencher automaticamente
              </p>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">CEP</label>
                <div className="relative">
                  <input
                    type="text"
                    value={addressData.cep}
                    onChange={(e) => {
                      const numbers = e.target.value.replace(/\D/g, "")
                      const formatted = numbers.replace(/(\d{5})(\d)/, "$1-$2")
                      setAddressData(prev => ({ ...prev, cep: formatted }))
                      if (numbers.length === 8) {
                        fetchAddressByCep(formatted)
                      }
                    }}
                    placeholder="00000-000"
                    maxLength={9}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                  />
                  {loadingCep && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Cidade</label>
                <input
                  type="text"
                  value={addressData.city}
                  onChange={(e) => setAddressData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Nome da cidade"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Bairro</label>
                <input
                  type="text"
                  value={addressData.neighborhood}
                  onChange={(e) => setAddressData(prev => ({ ...prev, neighborhood: e.target.value }))}
                  placeholder="Nome do bairro"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Rua</label>
                <input
                  type="text"
                  value={addressData.street}
                  onChange={(e) => setAddressData(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="Nome da rua"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Numero</label>
                <input
                  type="text"
                  value={addressData.number}
                  onChange={(e) => setAddressData(prev => ({ ...prev, number: e.target.value }))}
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Complemento <span className="text-muted-foreground">(opcional)</span></label>
                <input
                  type="text"
                  value={addressData.complement}
                  onChange={(e) => setAddressData(prev => ({ ...prev, complement: e.target.value }))}
                  placeholder="Apto, bloco, referencia..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("form")}
                  className="flex-shrink-0 bg-transparent"
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-6 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base font-semibold
                    hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <QrCode className="w-5 h-5" />
                  Gerar QR Code PIX
                </Button>
              </div>
            </form>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground">Gerando QR Code PIX...</p>
            </div>
          )}

          {step === "qrcode" && pixData && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Escaneie o QR Code ou copie o codigo PIX
                </p>
                
                {/* QR Code */}
                <div className="bg-white p-4 rounded-xl inline-block mx-auto mb-4">
                  {pixData.pixQrCodeImage ? (
                    <Image
                      src={pixData.pixQrCodeImage || "/placeholder.svg"}
                      alt="QR Code PIX"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-secondary flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <p className="text-2xl font-bold text-primary mb-2">
                  R$ {amount.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Valido por 1 hora
                </p>
              </div>

              {/* Codigo PIX Copia e Cola */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">PIX Copia e Cola</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixData.pixCode}
                    readOnly
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground text-xs truncate"
                  />
                  <Button
                    onClick={copyPixCode}
                    variant="outline"
                    className="px-4 gap-2 bg-transparent"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">Como pagar:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Abra o app do seu banco</li>
                  <li>Escolha pagar com PIX</li>
                  <li>Escaneie o QR Code ou cole o codigo</li>
                  <li>Confirme o pagamento</li>
                </ol>
              </div>

              {/* Verificacao automatica de pagamento */}
              <div className="flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Aguardando confirmacao do pagamento...</span>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Pagamento Confirmado!</h3>
              <p className="text-muted-foreground">
                Seu pedido esta sendo preparado e logo saira para entrega.
              </p>
              
              <div className="bg-secondary/50 rounded-xl p-4 mt-6">
                <p className="text-sm text-muted-foreground">
                  Obrigado pela sua compra! Voce recebera atualizacoes sobre o status da entrega.
                </p>
              </div>

              <Button
                onClick={() => {
                  onSuccess()
                  onClose()
                }}
                className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold mt-4"
              >
                Fechar
              </Button>
            </div>
          )}

          {step === "error" && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <p className="text-foreground font-medium">Erro ao gerar PIX</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button
                onClick={() => setStep("form")}
                variant="outline"
                className="bg-transparent"
              >
                Tentar novamente
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
