"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CartItem, Product, Additional } from "./types"

interface CartContextType {
  items: CartItem[]
  addItem: (
    product: Product,
    quantity: number,
    additionals: { additional: Additional; quantity: number }[],
    observation: string
  ) => void
  addCombo: (comboItems: { destilados: { product: Product; qty: number }[]; gelos: { product: Product; qty: number }[]; energeticos: { product: Product; qty: number }[] }, comboPrice: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  freeAdditionalChosen: Additional | null
  setFreeAdditionalChosen: (additional: Additional | null) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [freeAdditionalChosen, setFreeAdditionalChosen] = useState<Additional | null>(null)

  const addItem = (
    product: Product,
    quantity: number,
    additionals: { additional: Additional; quantity: number }[],
    observation: string
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }
      return [...prev, { product, quantity, additionals, observation }]
    })
  }

  const addCombo = (comboItems: { destilados: { product: Product; qty: number }[]; gelos: { product: Product; qty: number }[]; energeticos: { product: Product; qty: number }[] }, comboPrice: number) => {
    const comboId = `combo-${Date.now()}`
    const allItems = [...comboItems.destilados, ...comboItems.gelos, ...comboItems.energeticos]
    const descParts = allItems.map((i) => `${i.qty}x ${i.product.name}`).join(" + ")
    const comboProduct: Product = {
      id: comboId,
      name: "Combo 30% OFF",
      description: descParts,
      price: comboPrice,
      image: comboItems.destilados[0]?.product.image || "/placeholder.svg",
      category: "combo",
    }
    setItems((prev) => [
      ...prev,
      {
        product: comboProduct,
        quantity: 1,
        additionals: [],
        observation: "",
        isCombo: true,
        comboPrice,
        comboItems,
      },
    ])
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setFreeAdditionalChosen(null)
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addCombo,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        freeAdditionalChosen,
        setFreeAdditionalChosen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
