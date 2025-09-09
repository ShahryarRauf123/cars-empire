"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)

    // Check if document is already loaded
    if (document.readyState === "complete") {
      setIsLoading(false)
      return
    }

    // Listen for page load completion
    const handleLoad = () => {
      setIsLoading(false)
    }

    // Listen for DOM content loaded
    const handleDOMContentLoaded = () => {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false)
      }, 200)
    }

    // Add event listeners
    window.addEventListener("load", handleLoad)
    document.addEventListener("DOMContentLoaded", handleDOMContentLoaded)

    // Fallback timeout in case events don't fire
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      window.removeEventListener("load", handleLoad)
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded)
      clearTimeout(fallbackTimer)
    }
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 top-16 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated loader */}
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-muted animate-spin border-t-primary"></div>
          <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent animate-ping border-t-primary/20"></div>
        </div>

        {/* Loading text with typing animation */}
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-muted-foreground">Loading</span>
          <div className="flex space-x-1">
            <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-1 w-1 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
