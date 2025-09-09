"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardBorderProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedCardBorder({ children, className }: AnimatedCardBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    // Set initial dimensions
    updateDimensions()
    // Update dimensions on window resize
    window.addEventListener("resize", updateDimensions)

    // Cleanup event listener
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const strokeWidth = 1.5 // Reduced stroke width for a thinner line
  const borderRadius = 8 // Matches rounded-lg (0.5rem * 16px/rem = 8px)

  // Calculate perimeter for the inner rectangle that the stroke will follow
  // The rect will be slightly smaller than the container to account for strokeWidth
  const rectWidth = dimensions.width > 0 ? dimensions.width - strokeWidth : 0
  const rectHeight = dimensions.height > 0 ? dimensions.height - strokeWidth : 0
  const perimeter = 2 * (rectWidth + rectHeight)

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {children}
      {dimensions.width > 0 &&
        dimensions.height > 0 && ( // Only render SVG if dimensions are known
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} // Use actual dimensions for viewBox
            preserveAspectRatio="none" // Allow SVG to stretch to fill container
          >
            <motion.rect
              x={strokeWidth / 2} // Center the stroke on the border
              y={strokeWidth / 2}
              width={rectWidth}
              height={rectHeight}
              rx={borderRadius} // Apply border radius
              fill="none" // Ensure no fill, only outline
              stroke="var(--primary)" // Use theme's primary color for the stroke
              strokeWidth={strokeWidth}
              strokeDasharray={perimeter} // Set dash array to the full perimeter
              initial={{ opacity: 0 }} // Start with opacity 0
              animate={{
                opacity: 1, // Make the stroke fully opaque
                strokeDashoffset: [0, perimeter], // Animate from 0 to perimeter for a continuous loop
              }}
              transition={{
                opacity: { duration: 0.5, ease: "easeOut" }, // Fade in the border
                strokeDashoffset: { duration: 4, ease: "linear", repeat: Number.POSITIVE_INFINITY }, // Speed of revolution
              }}
            />
          </motion.svg>
        )}
    </div>
  )
}
