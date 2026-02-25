"use client"

import { useState, useEffect } from "react"
import { X, Minus, Plus, Trash2, ShoppingBag, Pencil } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PixCheckout } from "./pix-checkout"
import { UpsellCombo } from "./upsell-combo"
import { UpsellComida, UPSELL_PRODUCT_IDS } from "./upsell-comida"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigateToCategory?: (categoryId: string) => void
}

const MIN_ORDER_VALUE = 85

export function CartDrawer({ isOpen, onClose, onNavigateToCategory }: CartDrawerProps) {
  const { items, totalPrice, updateQuantity, removeItem, clearCart, addCombo } = useCart()
  const [showPixCheckout, setShowPixCheckout] = useState(false)
  const [showUpsellComida, setShowUpsellComida] = useState(false)
  const [editingComboId, setEditingComboId] = useState<string | null>(null)
  const [showComboBuilder, setShowComboBuilder] = useState(false)

  const hasUpsellItemInCart = items.some((item) => UPSELL_PRODUCT_IDS.includes(item.product.id))

  const canCheckout = totalPrice >= MIN_ORDER_VALUE
  const remainingValue = MIN_ORDER_VALUE - totalPrice

  const handleCheckout = () => {
    if (!canCheckout) return
    if (!hasUpsellItemInCart) {
      setShowUpsellComida(true)
    } else {
      setShowPixCheckout(true)
    }
  }

  const handleUpsellClose = () => {
    setShowUpsellComida(false)
  }

  const handleUpsellSkip = () => {
    setShowUpsellComida(false)
    setShowPixCheckout(true)
  }

  const handleViewMenu = () => {
    setShowUpsellComida(false)
    onClose()
    if (onNavigateToCategory) {
      onNavigateToCategory("comida")
    }
  }

  const handlePaymentSuccess = () => {
    clearCart()
    onClose()
  }

  // Lock body scroll on iOS Safari when cart is open
  useEffect(() => {
    if (!isOpen) return
    const scrollY = window.scrollY
    document.body.classList.add("drawer-open")
    document.body.style.top = `-${scrollY}px`

    return () => {
      document.body.classList.remove("drawer-open")
      document.body.style.top = ""
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="safari-drawer-overlay z-50">
      <div className="fixed inset-0 z-50 bg-black/60 animate-in fade-in duration-300" />
      <div className="fixed bottom-0 left-0 right-0 z-[51] bg-card rounded-t-3xl max-h-[85dvh] max-h-[85svh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-full duration-500 ease-out">
        <div className="max-w-lg mx-auto w-full flex flex-col flex-1 min-h-0">
          <div className="flex-shrink-0 bg-card border-b border-border p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Seu Carrinho</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 min-h-0 safari-scroll">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.product.id}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`flex gap-4 rounded-xl p-4 animate-in fade-in slide-in-from-right-4 fill-mode-both
                      transition-colors duration-200 ${item.isCombo ? "bg-amber-50 border border-amber-200" : "bg-secondary hover:bg-secondary/80"}`}
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      {item.isCombo && item.comboItems ? (
                        <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5 bg-secondary/30 rounded-lg overflow-hidden">
                          {item.comboItems.destilados[0] && (
                            <div className="relative">
                              <Image src={item.comboItems.destilados[0].product.image || "/placeholder.svg"} alt="Destilado" fill className="object-cover" />
                            </div>
                          )}
                          {item.comboItems.gelos[0] && (
                            <div className="relative">
                              <Image src={item.comboItems.gelos[0].product.image || "/placeholder.svg"} alt="Gelo" fill className="object-cover" />
                            </div>
                          )}
                          {item.comboItems.energeticos[0] && (
                            <div className="relative col-span-2">
                              <Image src={item.comboItems.energeticos[0].product.image || "/placeholder.svg"} alt="Energetico" fill className="object-cover" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground line-clamp-1">
                        {item.isCombo ? "Combo 30% OFF" : item.product.name}
                      </h3>
                      {item.isCombo && item.comboItems ? (
                        <div className="mt-0.5">
                          {item.comboItems.destilados.map((s) => (
                            <p key={s.product.id} className="text-xs text-muted-foreground line-clamp-1">{s.qty}x {s.product.name}</p>
                          ))}
                          {item.comboItems.gelos.map((s) => (
                            <p key={s.product.id} className="text-xs text-muted-foreground line-clamp-1">{s.qty}x {s.product.name}</p>
                          ))}
                          {item.comboItems.energeticos.map((s) => (
                            <p key={s.product.id} className="text-xs text-muted-foreground line-clamp-1">{s.qty}x {s.product.name}</p>
                          ))}
                        </div>
                      ) : null}
                      <p className={`text-sm font-bold ${item.isCombo ? "text-amber-600" : "text-primary"}`}>
                        R$ {item.product.price.toFixed(2).replace(".", ",")}
                      </p>
                      {!item.isCombo && item.additionals && item.additionals.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          + {item.additionals.map((a) => a.additional.name).join(", ")}
                        </p>
                      )}
                      {!item.isCombo && item.observation && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Obs: {item.observation}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        {!item.isCombo && (
                          <>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-card hover:scale-110 active:scale-90 transition-all duration-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-medium text-foreground w-6 text-center transition-all duration-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-card hover:scale-110 active:scale-90 transition-all duration-200"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </>
                        )}
                        {item.isCombo && (
                          <button
                            onClick={() => {
                              setEditingComboId(item.product.id)
                            }}
                            className="ml-auto p-2 text-amber-600 hover:text-amber-700 hover:scale-110 active:scale-90 transition-all duration-200"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className={`${item.isCombo ? "" : "ml-auto"} p-2 text-accent hover:text-accent/80 hover:scale-110 active:scale-90 transition-all duration-200`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Upsell Combo - so mostra se nao tiver combo no carrinho */}
                {!items.some((item) => item.isCombo) && (
                  <UpsellCombo onAddCombo={addCombo} />
                )}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="flex-shrink-0 border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] space-y-4 bg-card">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Entrega</span>
                <span className="font-medium text-primary">Grátis</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-bold text-foreground text-lg">Total</span>
                <span className="font-bold text-foreground text-lg">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              {!canCheckout && (
                <p className="text-xs text-accent text-center">
                  Faltam R$ {remainingValue.toFixed(2).replace(".", ",")} para atingir o pedido minimo de R$ {MIN_ORDER_VALUE.toFixed(2).replace(".", ",")}
                </p>
              )}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="flex-shrink-0 bg-transparent"
                >
                  Limpar
                </Button>
                <Button
                  onClick={handleCheckout}
                  disabled={!canCheckout}
                  className={`flex-1 py-6 text-base font-semibold gap-2 transition-all duration-200 ${
                    canCheckout 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]" 
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {canCheckout ? "Finalizar compra" : `Pedido minimo R$ ${MIN_ORDER_VALUE}`}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Edicao de Combo */}
      {editingComboId && (() => {
        const comboItem = items.find((i) => i.product.id === editingComboId)
        if (!comboItem?.comboItems) return null
        return (
          <UpsellCombo
            editMode={comboItem.comboItems}
            onAddCombo={(comboItems, comboPrice) => {
              removeItem(editingComboId)
              addCombo(comboItems, comboPrice)
              setEditingComboId(null)
            }}
            onCancelEdit={() => setEditingComboId(null)}
          />
        )
      })()}

      {/* Modal de Upsell Comida */}
      {showUpsellComida && (
        <UpsellComida
          onClose={handleUpsellClose}
          onContinue={handleUpsellClose}
          onSkip={handleUpsellSkip}
          onViewMenu={handleViewMenu}
        />
      )}

      {/* Modal de Combo Builder (via banner) */}
      {showComboBuilder && (
        <UpsellCombo
          startOpen
          onAddCombo={(comboItems, comboPrice) => {
            addCombo(comboItems, comboPrice)
            setShowComboBuilder(false)
          }}
          onCancelEdit={() => setShowComboBuilder(false)}
        />
      )}

      {/* Modal de Checkout PIX */}
      {showPixCheckout && (
        <PixCheckout
          amount={totalPrice}
          items={items.map(item => ({ name: item.product.name, quantity: item.quantity, price: item.product.price }))}
          onClose={() => setShowPixCheckout(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}
