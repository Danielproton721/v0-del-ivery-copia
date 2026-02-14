"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useEffect, useState, useRef } from "react"

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
  const { totalItems, totalPrice } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const prevItems = useRef(totalItems)

  useEffect(() => {
    if (totalItems > prevItems.current) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
    prevItems.current = totalItems
  }, [totalItems])

  // Esconde o botao quando o footer esta visivel
  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHidden(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  if (totalItems === 0) return null

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 max-w-lg mx-auto bg-primary text-primary-foreground rounded-xl py-4 px-6 flex items-center justify-between shadow-lg z-50 
        hover:bg-primary/90 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1
        active:scale-[0.98] active:shadow-lg
        transition-all duration-300 ease-out
        ${isHidden ? "translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
        ${isAnimating ? "animate-bounce" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className={`relative transition-transform duration-300 ${isAnimating ? "scale-125" : ""}`}>
          <ShoppingBag className="w-6 h-6" />
          <span className={`absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold
            transition-all duration-300
            ${isAnimating ? "scale-125 animate-pulse" : ""}`}>
            {totalItems}
          </span>
        </div>
        <span className="font-medium">Ver carrinho</span>
      </div>
      <span className="font-bold transition-all duration-300">
        R$ {totalPrice.toFixed(2).replace(".", ",")}
      </span>
    </button>
  )
}
