"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { X, Plus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import { useCart } from "@/lib/cart-context"

export const UPSELL_PRODUCT_IDS = [
  "213", // O`BURGER
  "201", // Bolinho de Carne Seca com Queijo
  "200", // Batata Frita com Queijo e Bacon
  "202", // Camarao Ao Alho E Oleo
  "203", // Chapa Mista G
  "204", // Coxinha de Frango com Requeijao
  "205", // Escalope de Mignon
  "207", // File Acebolado
  "208", // File de Tilapia com Fritas
  "209", // File em Medalhao com Alcaparras
  "210", // Fraldinha Mista
  "211", // Frango a Passarinho
  "214", // Pastel de Carne com Queijo
  "215", // Porcao de Feijao Tropeiro 300g
  "216", // Torresmo Pururuca com Mandioca
  "217", // Tulipas com Molho Especial
  // Refrigerantes
  "105", // Refrigerante Coca-Cola Zero Acucar 2L
  "106", // Refrigerante Coca-Cola Zero Acucar 350ml
  "109", // Refrigerante Coca-Cola Sleek 310ml
  "100", // Pepsi 2L
  "99",  // Pepsi Black 2L
  "101", // Guarana Antarctica 2L
  "22",  // Guarana Antarctica Lata 350ml
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface UpsellComidaProps {
  onClose: () => void
  onContinue: () => void
  onSkip?: () => void
  onViewMenu?: () => void
}

export function UpsellComida({ onClose, onContinue, onSkip, onViewMenu }: UpsellComidaProps) {
  const { addItem } = useCart()
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const [isClosing, setIsClosing] = useState(false)

  const upsellProducts = useMemo(() => {
    const seen = new Set<string>()
    const filtered = products.filter((p) => {
      if (UPSELL_PRODUCT_IDS.includes(p.id) && !seen.has(p.id)) {
        seen.add(p.id)
        return true
      }
      return false
    })
    return shuffleArray(filtered)
  }, [])

  const handleAddItem = (product: (typeof upsellProducts)[0]) => {
    addItem(product, 1, [], "")
    setAddedIds((prev) => new Set(prev).add(product.id))
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => onClose(), 400)
  }

  const handleContinue = () => {
    setIsClosing(true)
    setTimeout(() => onContinue(), 400)
  }

  const handleSkip = () => {
    setIsClosing(true)
    setTimeout(() => (onSkip ? onSkip() : onContinue()), 400)
  }

  const handleViewMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      if (onViewMenu) onViewMenu()
    }, 400)
  }

  const addedCount = addedIds.size

  return (
    <div className="fixed inset-0 z-[60]" style={{ minHeight: '100dvh' }}>
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-400 ${isClosing ? "opacity-0" : "animate-in fade-in duration-300"}`}
        onClick={handleClose}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-[61] bg-card rounded-t-3xl max-h-[85dvh] max-h-[85svh] overflow-hidden flex flex-col transition-transform duration-400 ease-in-out ${isClosing ? "translate-y-full" : "animate-in slide-in-from-bottom-full duration-500 ease-out"}`}
      >
        <div className="max-w-lg mx-auto w-full flex flex-col flex-1 min-h-0">
          {/* Header */}
          <div className="flex-shrink-0 bg-card border-b border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-xl">
                  <span role="img" aria-label="hamburger">🍔</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Bateu a fome? Que tal pedir um acompanhamento?</h2>
                  <p className="text-xs text-muted-foreground">
                    Adicione um prato ao seu pedido
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-secondary"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Products list */}
          <div className="flex-1 overflow-y-auto p-4 min-h-0 safari-scroll">
            <div className="space-y-3">
              {upsellProducts.map((product, index) => {
                const isAdded = addedIds.has(product.id)
                return (
                  <div
                    key={product.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary/30">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm line-clamp-1">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                          {product.description}
                        </p>
                      )}
                      <p className="text-sm font-bold text-primary mt-1">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddItem(product)}
                      disabled={isAdded}
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                        ${
                          isAdded
                            ? "bg-green-500 text-white scale-110"
                            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 active:scale-90"
                        }`}
                    >
                      {isAdded ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-card space-y-3">
            {addedCount > 0 ? (
              <Button
                onClick={handleContinue}
                className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold gap-2
                  hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                {`Continuar com ${addedCount} ${addedCount === 1 ? "item" : "itens"} adicionado${addedCount === 1 ? "" : "s"}`}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSkip}
                  className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold gap-2
                    hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {"Nao quero. Finalizar"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <button
                  onClick={handleViewMenu}
                  className="w-full text-center text-sm font-medium text-primary hover:text-primary/80 underline transition-colors py-1"
                >
                  Ver cardapio completo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
