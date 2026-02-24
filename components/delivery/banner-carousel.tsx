"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"

const banners = [
  {
    id: 1,
    src: "/banners/banner-1.jpg",
    alt: "Deu fome? Peca aqui tambem! Entrega em minutos",
    categoryLink: "comida",
  },
  {
    id: 2,
    src: "/banners/banner2.webp",
    alt: "Monte seu combo! Precos imbativeis com 30% OFF",
    categoryLink: "queridinhos",
  },
]

interface BannerCarouselProps {
  onBannerClick?: (categoryId: string) => void
}

export function BannerCarousel({ onBannerClick }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-2">
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative aspect-[16/7] w-full flex-shrink-0 cursor-pointer"
              onClick={() => {
                if (banner.categoryLink && onBannerClick) {
                  onBannerClick(banner.categoryLink)
                }
              }}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 512px) 100vw, 512px"
                priority={banner.id === 1}
              />
            </div>
          ))}
        </div>
        {/* Indicadores */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                setCurrent(i)
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-5 bg-background" : "w-1.5 bg-background/50"
              }`}
              aria-label={`Ir para banner ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
