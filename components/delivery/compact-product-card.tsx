"use client"

import React from "react"

import Image from "next/image"
import type { Product } from "@/lib/types"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface CompactProductCardProps {
  product: Product
  onClick: () => void
  index?: number
}

export function CompactProductCard({ product, onClick, index = 0 }: CompactProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, 1)
  }

  return (
    <div
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="bg-card rounded-xl p-4 flex gap-4 shadow-sm border border-border text-left w-full cursor-pointer relative
        hover:shadow-lg hover:scale-[1.01] hover:border-primary/30 hover:bg-card/80
        active:scale-[0.99] active:shadow-sm
        transition-all duration-200 ease-out
        animate-in fade-in slide-in-from-right-4 fill-mode-both"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-baseline gap-2">
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
          <span className="text-base font-bold text-primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 group bg-secondary/30">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
        />
        {/* Botao adicionar ao carrinho */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-1 right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg
            hover:scale-110 hover:shadow-xl active:scale-95
            transition-all duration-200 z-10"
        >
          <ShoppingBag className="w-4 h-4 text-accent-foreground" />
        </button>
      </div>
    </div>
  )
}
