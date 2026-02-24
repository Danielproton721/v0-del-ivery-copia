"use client"

import { useState, useEffect } from "react"

export function PromoTimer() {
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

  return (
    <div className="bg-accent text-accent-foreground rounded-full px-4 py-2 flex items-center justify-between w-full">
      <span className="text-[11px] font-semibold whitespace-nowrap">Promocao acaba em</span>
      <div className="flex items-center gap-1 font-mono font-bold shrink-0">
        <span className="bg-card text-foreground px-1.5 py-0.5 rounded text-xs">00</span>
        <span className="animate-pulse text-xs">:</span>
        <span className="bg-card text-foreground px-1.5 py-0.5 rounded text-xs">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="animate-pulse text-xs">:</span>
        <span className={`bg-card text-foreground px-1.5 py-0.5 rounded text-xs transition-all duration-150 ${timeLeft.seconds <= 10 ? "text-accent scale-110" : ""}`}>
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}
