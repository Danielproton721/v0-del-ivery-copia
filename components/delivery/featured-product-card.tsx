"use client"

import React from "react"

import Image from "next/image"
import type { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface FeaturedProductCardProps {
  product: Product
  onClick: () => void
  index?: number
}

export function FeaturedProductCard({ product, onClick, index = 0 }: FeaturedProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, 1)
  }

  return (
    <div
      onClick={onClick}
      style={{ animationDelay: `${index * 100}ms` }}
      className="bg-card rounded-xl overflow-hidden shadow-sm border border-border text-left w-full h-full cursor-pointer relative flex flex-col
        hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1
        active:scale-[0.98] active:shadow-md
        transition-all duration-300 ease-out
        animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-secondary/30">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground font-bold text-xs animate-in zoom-in-50 duration-300 shadow-lg">
            {product.badge}
          </Badge>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-lg
            hover:scale-110 hover:shadow-xl active:scale-95
            transition-all duration-200 z-10"
        >
          <ShoppingBag className="w-4 h-4 text-accent-foreground" />
        </button>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2">{product.name}</h3>
        <div className="mt-auto pt-2">
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through block">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
          <span className="text-base font-bold text-primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {product.stock && (
          <p className="text-[10px] text-accent mt-1 font-medium leading-tight">
            Apenas {product.stock} unidade(s) com esse preco especial
          </p>
        )}
      </div>
    </div>
  )
}
