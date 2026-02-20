"use client"

import Image from "next/image"

const banner = {
  id: 1,
  src: "/banners/banner-1.jpg",
  alt: "Deu fome? Peca aqui tambem! Entrega em minutos",
  categoryLink: "comida",
}

interface BannerCarouselProps {
  onBannerClick?: (categoryId: string) => void
}

export function BannerCarousel({ onBannerClick }: BannerCarouselProps) {
  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-2">
      <div
        className="relative overflow-hidden rounded-xl cursor-pointer"
        onClick={() => {
          if (banner.categoryLink && onBannerClick) {
            onBannerClick(banner.categoryLink)
          }
        }}
      >
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
    </div>
  )
}
