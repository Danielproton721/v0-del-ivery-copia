"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"

const banners = [
  {
    id: 1,
    src: "/banners/banner-1.jpg",
    alt: "Deu fome? Peca aqui tambem! Entrega em minutos",
  },
  {
    id: 2,
    src: "/banners/banner-2.jpg",
    alt: "Destilados Premium com desconto",
  },
  {
    id: 3,
    src: "/banners/banner-3.jpg",
    alt: "Drinks e Combos especiais",
  },
]

export function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setTranslateX(0)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
    setTranslateX(0)
  }, [])

  // Auto-play every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [nextSlide])

  const pauseAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const resumeAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(nextSlide, 5000)
  }, [nextSlide])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoplay()
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const diff = e.touches[0].clientX - startX
    setTranslateX(diff)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 50
    if (translateX > threshold) {
      // Swipe right - previous
      setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
    } else if (translateX < -threshold) {
      // Swipe left - next
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }

    setTranslateX(0)
    resumeAutoplay()
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-2">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? translateX : 0}px))`,
            transition: isDragging ? "none" : "transform 300ms ease-out",
          }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0">
              <div className="relative aspect-[16/7] w-full">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 512px) 100vw, 512px"
                  priority
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index)
                pauseAutoplay()
                resumeAutoplay()
              }}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-5 h-2 bg-white"
                  : "w-2 h-2 bg-white/50"
              }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
