"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useEffect, useState, useRef } from "react"

interface CartButtonProps {
  onClick: () => void
  isCartOpen?: boolean
}

export function CartButton({ onClick, isCartOpen = false }: CartButtonProps) {
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

  if (totalItems === 0 || isCartOpen) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        transform: 'translate3d(0,0,0)',
        WebkitTransform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
    >
    <button
      onClick={onClick}
      className={`pointer-events-auto mx-4 mb-4 max-w-lg bg-primary text-primary-foreground rounded-xl py-4 px-6 flex items-center justify-between shadow-lg w-[calc(100%-2rem)]
        hover:bg-primary/90 hover:shadow-2xl
        active:scale-[0.98] active:shadow-lg
        transition-opacity duration-300 ease-out
        ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}
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
    </div>
  )
}
