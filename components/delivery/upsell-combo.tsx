"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { X, Check, ChevronRight, Percent, Zap, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import type { Product } from "@/lib/types"

interface ComboSelection {
  product: Product
  qty: number
}

interface UpsellComboProps {
  onAddCombo: (
    comboItems: {
      destilados: ComboSelection[]
      gelos: ComboSelection[]
      energeticos: ComboSelection[]
    },
    comboPrice: number
  ) => void
  editMode?: {
    destilados: ComboSelection[]
    gelos: ComboSelection[]
    energeticos: ComboSelection[]
  }
  onCancelEdit?: () => void
}

type ComboStep = "preview" | "destilado" | "gelo" | "energetico" | "confirm"

export function UpsellCombo({ onAddCombo, editMode, onCancelEdit }: UpsellComboProps) {
  const [step, setStep] = useState<ComboStep>(editMode ? "confirm" : "preview")
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    if (!editMode) return {}
    const init: Record<string, number> = {}
    for (const s of [...editMode.destilados, ...editMode.gelos, ...editMode.energeticos]) {
      init[s.product.id] = s.qty
    }
    return init
  })

  const getQty = (productId: string) => quantities[productId] || 0
  const setQty = (productId: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(0, qty) }))
  }

  const destilados = useMemo(
    () => products.filter((p) => p.category === "queridinhos" && !p.name.toLowerCase().includes("combo")),
    []
  )
  const gelos = useMemo(() => products.filter((p) => p.category === "poke"), [])
  const energeticos = useMemo(() => products.filter((p) => p.category === "combinados"), [])

  // Produtos selecionados (qty > 0) por categoria
  const selectedDestilados: ComboSelection[] = destilados
    .filter((p) => getQty(p.id) > 0)
    .map((p) => ({ product: p, qty: getQty(p.id) }))
  const selectedGelos: ComboSelection[] = gelos
    .filter((p) => getQty(p.id) > 0)
    .map((p) => ({ product: p, qty: getQty(p.id) }))
  const selectedEnergeticos: ComboSelection[] = energeticos
    .filter((p) => getQty(p.id) > 0)
    .map((p) => ({ product: p, qty: getQty(p.id) }))

  const allSelected = [...selectedDestilados, ...selectedGelos, ...selectedEnergeticos]
  const originalTotal = allSelected.reduce((sum, s) => sum + s.product.price * s.qty, 0)
  const comboPrice = originalTotal * 0.7
  const savings = originalTotal - comboPrice

  const hasDestilados = selectedDestilados.length > 0
  const hasGelos = selectedGelos.length > 0
  const hasEnergeticos = selectedEnergeticos.length > 0

  useEffect(() => {
    if (step !== "preview") {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [step])

  const handleConfirm = () => {
    if (hasDestilados && hasGelos && hasEnergeticos) {
      onAddCombo(
        {
          destilados: selectedDestilados,
          gelos: selectedGelos,
          energeticos: selectedEnergeticos,
        },
        comboPrice
      )
      setStep("preview")
      setQuantities({})
    }
  }

  const handleClose = () => {
    if (editMode && onCancelEdit) {
      onCancelEdit()
    } else {
      setStep("preview")
    }
  }

  const handleNext = () => {
    if (step === "destilado") setStep("gelo")
    else if (step === "gelo") setStep("energetico")
    else if (step === "energetico") setStep("confirm")
  }

  const canAdvance =
    (step === "destilado" && hasDestilados) ||
    (step === "gelo" && hasGelos) ||
    (step === "energetico" && hasEnergeticos)

  const currentCategoryCount =
    step === "destilado"
      ? selectedDestilados.reduce((s, i) => s + i.qty, 0)
      : step === "gelo"
        ? selectedGelos.reduce((s, i) => s + i.qty, 0)
        : selectedEnergeticos.reduce((s, i) => s + i.qty, 0)

  // Preview card
  if (step === "preview") {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
            <Percent className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm">Monte seu Combo com 30% OFF</h3>
            <p className="text-xs text-muted-foreground">Destilados + Gelos Saborizados + Energeticos</p>
          </div>
        </div>
        <div className="flex items-center gap-2 my-3">
          <div className="flex -space-x-2">
            {destilados[0] && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-card">
                <Image src={destilados[0].image || "/placeholder.svg"} alt="Destilado" fill className="object-cover" />
              </div>
            )}
            {gelos[0] && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-card">
                <Image src={gelos[0].image || "/placeholder.svg"} alt="Gelo" fill className="object-cover" />
              </div>
            )}
            {energeticos[0] && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-card">
                <Image src={energeticos[0].image || "/placeholder.svg"} alt="Energetico" fill className="object-cover" />
              </div>
            )}
          </div>
          <div className="flex-1" />
          <Button
            onClick={() => setStep("destilado")}
            className="bg-amber-500 text-white hover:bg-amber-600 text-sm font-semibold gap-1 px-4"
          >
            <Zap className="w-4 h-4" />
            Montar Combo
          </Button>
        </div>
      </div>
    )
  }

  const currentProducts = step === "destilado" ? destilados : step === "gelo" ? gelos : energeticos

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-card flex flex-col">
      {/* HEADER */}
      <div className="shrink-0 border-b border-border px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">
            {step === "destilado" && "Escolha os Destilados"}
            {step === "gelo" && "Escolha os Gelos Saborizados"}
            {step === "energetico" && "Escolha os Energeticos"}
            {step === "confirm" && "Confirmar Combo"}
          </h2>
          <button type="button" onClick={handleClose} className="p-2 rounded-full hover:bg-secondary">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex-1 h-1.5 rounded-full transition-colors ${["destilado", "gelo", "energetico", "confirm"].includes(step) ? "bg-amber-400" : "bg-border"}`} />
          <div className={`flex-1 h-1.5 rounded-full transition-colors ${["gelo", "energetico", "confirm"].includes(step) ? "bg-amber-400" : "bg-border"}`} />
          <div className={`flex-1 h-1.5 rounded-full transition-colors ${["energetico", "confirm"].includes(step) ? "bg-amber-400" : "bg-border"}`} />
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {step !== "confirm" ? (
          <div className="p-4 space-y-2">
            {currentProducts.map((product) => {
              const qty = getQty(product.id)
              return (
                <div
                  key={product.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200
                    ${qty > 0 ? "border-amber-400 bg-amber-50" : "border-border bg-card"}`}
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-secondary/30">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm line-clamp-1">{product.name}</p>
                    <p className="text-sm font-bold text-primary">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 bg-secondary rounded-lg px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setQty(product.id, qty - 1)}
                      disabled={qty <= 0}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-40 active:scale-90 transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-foreground text-sm w-5 text-center">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(product.id, qty + 1)}
                      className="text-muted-foreground hover:text-foreground active:scale-90 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Destilados selecionados */}
            {selectedDestilados.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-sm">Destilados</h3>
                  <button type="button" onClick={() => setStep("destilado")} className="text-xs text-amber-600 font-semibold hover:underline">
                    Editar
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedDestilados.map((s) => (
                    <div key={s.product.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/30">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-secondary/30">
                        <Image src={s.product.image || "/placeholder.svg"} alt={s.product.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm line-clamp-1">{s.qty}x {s.product.name}</p>
                        <p className="text-xs text-primary font-semibold">R$ {(s.product.price * s.qty).toFixed(2).replace(".", ",")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gelos selecionados */}
            {selectedGelos.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-sm">Gelos Saborizados</h3>
                  <button type="button" onClick={() => setStep("gelo")} className="text-xs text-amber-600 font-semibold hover:underline">
                    Editar
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedGelos.map((s) => (
                    <div key={s.product.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/30">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-secondary/30">
                        <Image src={s.product.image || "/placeholder.svg"} alt={s.product.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm line-clamp-1">{s.qty}x {s.product.name}</p>
                        <p className="text-xs text-primary font-semibold">R$ {(s.product.price * s.qty).toFixed(2).replace(".", ",")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Energeticos selecionados */}
            {selectedEnergeticos.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-sm">Energeticos</h3>
                  <button type="button" onClick={() => setStep("energetico")} className="text-xs text-amber-600 font-semibold hover:underline">
                    Editar
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedEnergeticos.map((s) => (
                    <div key={s.product.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/30">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-secondary/30">
                        <Image src={s.product.image || "/placeholder.svg"} alt={s.product.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm line-clamp-1">{s.qty}x {s.product.name}</p>
                        <p className="text-xs text-primary font-semibold">R$ {(s.product.price * s.qty).toFixed(2).replace(".", ",")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resumo de precos */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
              {allSelected.map((s) => (
                <div key={s.product.id} className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="truncate mr-2">{s.qty}x {s.product.name.substring(0, 22)}</span>
                  <span className="shrink-0">R$ {(s.product.price * s.qty).toFixed(2).replace(".", ",")}</span>
                </div>
              ))}
              <div className="border-t border-amber-200 pt-2 mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Subtotal:</span>
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {originalTotal.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Total com 30% OFF:</span>
                  <span className="font-bold text-amber-600 text-lg">
                    R$ {comboPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-200">
                  <span className="font-bold text-green-700">Voce economizou:</span>
                  <span className="font-bold text-green-600 text-lg">
                    R$ {savings.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      {step !== "confirm" ? (
        <div className="shrink-0 border-t border-border p-4 pb-8 bg-card">
          <Button
            onClick={handleNext}
            disabled={!canAdvance}
            className="w-full py-6 bg-amber-500 text-white hover:bg-amber-600 text-base font-semibold gap-2
              active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
            Proximo ({currentCategoryCount} {currentCategoryCount === 1 ? "item" : "itens"})
          </Button>
        </div>
      ) : (
        <div className="shrink-0 border-t border-border p-4 pb-8 bg-card">
          <Button
            onClick={handleConfirm}
            disabled={!hasDestilados || !hasGelos || !hasEnergeticos}
            className="w-full py-6 bg-amber-500 text-white hover:bg-amber-600 text-base font-semibold gap-2
              active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
          >
            <Check className="w-5 h-5" />
            Adicionar Combo
          </Button>
        </div>
      )}
    </div>
  )
}
