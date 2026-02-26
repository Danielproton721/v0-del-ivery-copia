"use client"

import { useState, useEffect } from "react"
import { X, Copy, Check, QrCode, Trash2, Clock, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export interface PendingOrder {
  transactionId: string
  pixCode: string
  pixQrCodeImage?: string
  amount: number
  items: Array<{ name: string; quantity: number; price: number }>
  customerName: string
  createdAt: string
}

const STORAGE_KEY = "pending_pix_orders"
const EXPIRY_MS = 60 * 60 * 1000 // 1 hora

export function getPendingOrders(): PendingOrder[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const orders: PendingOrder[] = JSON.parse(raw)
    // Remove expirados
    const now = Date.now()
    const valid = orders.filter(
      (o) => now - new Date(o.createdAt).getTime() < EXPIRY_MS
    )
    if (valid.length !== orders.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valid))
    }
    return valid
  } catch {
    return []
  }
}

export function savePendingOrder(order: PendingOrder) {
  const orders = getPendingOrders()
  // Evita duplicatas
  if (orders.some((o) => o.transactionId === order.transactionId)) return
  orders.push(order)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function removePendingOrder(transactionId: string) {
  const orders = getPendingOrders()
  const filtered = orders.filter((o) => o.transactionId !== transactionId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

// Botao flutuante que aparece quando ha pedidos pendentes
export function PendingOrdersButton({ onClick }: { onClick: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const update = () => setCount(getPendingOrders().length)
    update()
    // Verifica a cada 5 segundos (caso expire)
    const interval = setInterval(update, 5000)
    // Ouve mudancas no localStorage de outras abas
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) update()
    }
    window.addEventListener("storage", handleStorage)
    return () => {
      clearInterval(interval)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  if (count === 0) return null

  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-[60] flex items-center gap-2 bg-amber-500 text-white px-4 py-2.5 rounded-full shadow-lg
        hover:bg-amber-600 active:scale-95 transition-all duration-200 animate-in slide-in-from-top-4 fade-in duration-500"
    >
      <Receipt className="w-4 h-4" />
      <span className="text-sm font-semibold">
        {count === 1 ? "Pedido pendente" : `${count} pedidos pendentes`}
      </span>
      <span className="w-5 h-5 bg-white text-amber-600 rounded-full text-xs font-bold flex items-center justify-center">
        {count}
      </span>
    </button>
  )
}

// Modal que mostra os pedidos pendentes
export function PendingOrdersModal({ onClose }: { onClose: () => void }) {
  const [orders, setOrders] = useState<PendingOrder[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<PendingOrder | null>(null)

  useEffect(() => {
    setOrders(getPendingOrders())
  }, [])

  const handleCopy = async (pixCode: string, transactionId: string) => {
    await navigator.clipboard.writeText(pixCode)
    setCopiedId(transactionId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleRemove = (transactionId: string) => {
    removePendingOrder(transactionId)
    setOrders(getPendingOrders())
    if (selectedOrder?.transactionId === transactionId) {
      setSelectedOrder(null)
    }
  }

  const getTimeRemaining = (createdAt: string) => {
    const elapsed = Date.now() - new Date(createdAt).getTime()
    const remaining = EXPIRY_MS - elapsed
    if (remaining <= 0) return "Expirado"
    const minutes = Math.floor(remaining / 60000)
    return `${minutes} min restantes`
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (orders.length === 0) {
    return (
      <div className="safari-drawer-overlay z-[80] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose} />
        <div className="relative bg-card rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-300 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-foreground font-medium">{"Nenhum pedido pendente"}</p>
          <p className="text-sm text-muted-foreground mt-1">{"Seus pedidos PIX aparecer\u00e3o aqui"}</p>
          <Button onClick={onClose} variant="outline" className="mt-4 bg-transparent">Fechar</Button>
        </div>
      </div>
    )
  }

  // Se um pedido esta selecionado, mostra o detalhe
  if (selectedOrder) {
    return (
      <div className="safari-drawer-overlay z-[80] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose} />
        <div className="relative bg-card rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90dvh] max-h-[90svh] overflow-y-auto safari-scroll">
          {/* Header */}
          <div className="bg-amber-500 p-5 text-white">
            <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Pedido Pendente</h2>
                <p className="text-sm text-white/80">
                  R$ {selectedOrder.amount.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{selectedOrder.customerName}</span>
              <span className="flex items-center gap-1 text-amber-600 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {getTimeRemaining(selectedOrder.createdAt)}
              </span>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <div className="bg-white p-4 rounded-xl inline-block mx-auto mb-4">
                {selectedOrder.pixQrCodeImage ? (
                  <Image
                    src={selectedOrder.pixQrCodeImage}
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
              <p className="text-2xl font-bold text-primary">
                R$ {selectedOrder.amount.toFixed(2).replace(".", ",")}
              </p>
            </div>

            {/* Codigo PIX Copia e Cola */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">PIX Copia e Cola</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={selectedOrder.pixCode}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground text-xs truncate"
                />
                <Button
                  onClick={() => handleCopy(selectedOrder.pixCode, selectedOrder.transactionId)}
                  variant="outline"
                  className="px-4 gap-2 bg-transparent"
                >
                  {copiedId === selectedOrder.transactionId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedId === selectedOrder.transactionId ? "Copiado" : "Copiar"}
                </Button>
              </div>
            </div>

            {/* Itens */}
            <div className="bg-secondary/50 rounded-xl p-4 text-sm">
              <p className="font-medium text-foreground mb-2">Itens do pedido:</p>
              <ul className="space-y-1 text-muted-foreground">
                {selectedOrder.items.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => {
                handleRemove(selectedOrder.transactionId)
                onClose()
                // Dispara evento para abrir tela de sucesso
                window.dispatchEvent(new CustomEvent("pix-payment-confirmed", {
                  detail: { transactionId: selectedOrder.transactionId }
                }))
              }}
              className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base font-semibold
                hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Check className="w-5 h-5" />
              Ja fiz o pagamento
            </Button>

            <div className="flex gap-3">
              <Button
                onClick={() => setSelectedOrder(null)}
                variant="outline"
                className="flex-shrink-0 bg-transparent"
              >
                Voltar
              </Button>
              <Button
                onClick={() => handleRemove(selectedOrder.transactionId)}
                variant="outline"
                className="flex-shrink-0 bg-transparent border-destructive text-destructive hover:bg-destructive/10 gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Remover
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Lista de pedidos
  return (
    <div className="safari-drawer-overlay z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative bg-card rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90dvh] max-h-[90svh] overflow-y-auto safari-scroll">
        {/* Header */}
        <div className="bg-amber-500 p-5 text-white">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Pedidos Pendentes</h2>
              <p className="text-sm text-white/80">
                {orders.length === 1 ? "1 pedido aguardando pagamento" : `${orders.length} pedidos aguardando pagamento`}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {orders.map((order) => (
            <button
              key={order.transactionId}
              onClick={() => setSelectedOrder(order)}
              className="w-full bg-secondary/50 hover:bg-secondary border border-border rounded-xl p-4 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">
                  R$ {order.amount.toFixed(2).replace(".", ",")}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                  <Clock className="w-3 h-3" />
                  {getTimeRemaining(order.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {order.customerName} - {formatDate(order.createdAt)}
                </span>
                <span className="text-xs text-primary font-medium">
                  {"Ver QR Code"}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
