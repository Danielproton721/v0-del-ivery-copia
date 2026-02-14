"use client"

import { Star, Clock, Truck, CreditCard, MapPin, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface StoreHeaderProps {
  userAddress?: string | null
  onChangeAddress?: () => void
}

export function StoreHeader({ userAddress, onChangeAddress }: StoreHeaderProps) {
  const [timeLeft, setTimeLeft] = useState({ minutes: 30, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        }
        return { minutes: 30, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Extrai cidade do endereco
  const getCityFromAddress = (address: string) => {
    const parts = address.split(",")
    if (parts.length >= 2) {
      // Tenta pegar a penultima ou ultima parte que geralmente é a cidade
      const city = parts[parts.length - 2]?.trim() || parts[parts.length - 1]?.trim()
      return city
    }
    return address
  }

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-lg mx-auto px-4 py-4">
        {/* Top bar: Receber em */}
        <button
          type="button"
          onClick={onChangeAddress}
          className="flex items-center gap-1.5 mb-3 min-w-0 cursor-pointer group animate-in fade-in slide-in-from-top-4 duration-500"
        >
          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="flex flex-col items-start min-w-0">
            <span className="text-[11px] text-muted-foreground leading-tight">{"Receber em"}</span>
            <span className="text-sm font-semibold text-foreground leading-tight truncate max-w-[200px] group-hover:text-primary transition-colors">
              {userAddress ? getCityFromAddress(userAddress) : "Selecione sua cidade"}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
        </button>

        {/* Logo centralizada e maior */}
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="w-[80px] h-[80px] flex items-center justify-center overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
            <Image
              src="/logo.png"
              alt="Arco Bebidas"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          
          {/* Badge loja aberta */}
          <div className="mt-2 inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-semibold text-primary">
              Loja aberta agora a 2,5 KM de voce!
            </span>
          </div>

          {/* Pedido minimo e prazo */}
          <p className="mt-1.5 text-xs text-muted-foreground">
            <span className="font-bold text-foreground">{""}</span>
            {" "}
            {userAddress ? (
              <>
                Receba em ate{" "}
                <span className="font-bold text-foreground">1 hora</span>
                {" "}em {getCityFromAddress(userAddress)}
              </>
            ) : (
              <>
                Receba em ate{" "}
                <span className="font-bold text-foreground">1 hora</span>
              </>
            )}
          </p>

          {/* Info abaixo da logo: avaliacao, tempo e frete */}
          <div className="flex items-center justify-center gap-3 mt-2 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">4.8</span>
              <span className="text-xs">(1360+ avaliacoes)</span>
            </div>
            <div className="flex items-center gap-1">
              
              
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Frete Gratis</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 font-semibold text-center">{"Combo gelado e rápido pro teu carnaval ! "}</p>
        </div>

        {/* Banner de localizacao */}
        {userAddress && (
          <button
            type="button"
            onClick={onChangeAddress}
            className="w-full mt-4 bg-primary/10 border border-primary/20 rounded-xl py-3 px-4
              hover:bg-primary/15 active:scale-[0.99] transition-all duration-200 cursor-pointer"
          >
            <span className="text-primary font-semibold text-sm">
              Entrega Grátis para {getCityFromAddress(userAddress)}!
            </span>
          </button>
        )}

        {/* Timer de Promoção */}
        <div className="mt-3 bg-accent text-accent-foreground rounded-xl px-4 py-3 flex items-center justify-center gap-3 
          animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both
          hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
          <span className="font-medium text-sm animate-pulse">Promoção acaba em:</span>
          <div className="flex items-center gap-1 font-mono font-bold text-lg">
            <span className="bg-card text-foreground px-2 py-1 rounded shadow-sm">00</span>
            <span className="animate-pulse">:</span>
            <span className="bg-card text-foreground px-2 py-1 rounded shadow-sm transition-all duration-300">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="animate-pulse">:</span>
            <span className={`bg-card text-foreground px-2 py-1 rounded shadow-sm transition-all duration-150 ${timeLeft.seconds <= 10 ? "text-accent scale-110" : ""}`}>
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Info discreta */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground
          animate-in fade-in duration-500 delay-300 fill-mode-both">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{"30-80 min"}</span>
          </div>
          <span className="text-border">|</span>
          <div className="flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5" />
            <span className="leading-3 tracking-tighter">   Aceitamos Pix</span>
          </div>
        </div>
      </div>
    </header>
  )
}
