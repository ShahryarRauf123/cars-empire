"use client"

import { motion } from "framer-motion"

// Define different vehicle types with their base styles using theme colors
const vehicleTypes = [
  { type: "car", color: "bg-primary", width: "w-20", height: "h-8", shape: "rounded-md" },
  { type: "sports-car", color: "bg-secondary", width: "w-18", height: "h-7", shape: "rounded-lg" },
  { type: "suv", color: "bg-muted-foreground", width: "w-24", height: "h-10", shape: "rounded-lg" },
  { type: "sports-bike", color: "bg-accent", width: "w-16", height: "h-6", shape: "rounded-full" },
  { type: "bike", color: "bg-primary/80", width: "w-18", height: "h-7", shape: "rounded-full" },
]

const numberOfVehicles = 20 // Number of vehicles to animate simultaneously

export function AnimatedTrafficBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {Array.from({ length: numberOfVehicles }).map((_, i) => {
        const vehicleConfig = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]
        const initialX = -Math.random() * 1500 - 300 // Start further off-screen left
        const finalX = 2500 + Math.random() * 500 // End far off-screen right (large enough for most screens)
        const duration = Math.random() * 10 + 8 // Random duration between 8 and 18 seconds (faster overall)
        const delay = Math.random() * 3 // Random delay up to 3 seconds for quicker staggered start
        const topPosition = Math.random() * 100 // Random vertical position (0-100vh)
        const opacity = Math.random() * 0.1 + 0.05 // Subtle opacity between 0.05 and 0.15
        const blur = Math.random() * 2 + 0.5 // Slight blur for depth effect

        // Randomize size slightly
        const sizeMultiplier = Math.random() * 0.5 + 0.75 // Between 0.75 and 1.25
        const width = `${(vehicleConfig.type.includes("bike") ? 40 : 60) * sizeMultiplier}px` // Smaller for bikes
        const height = `${(vehicleConfig.type.includes("bike") ? 25 : 30) * sizeMultiplier}px` // Smaller for bikes

        return (
          <motion.div
            key={i}
            className={`absolute ${vehicleConfig.width} ${vehicleConfig.height} ${vehicleConfig.shape} ${vehicleConfig.color}`}
            style={{
              top: `${topPosition}vh`,
              opacity: opacity,
              filter: `blur(${blur}px)`,
            }}
            initial={{ x: initialX }}
            animate={{ x: finalX }}
            transition={{
              duration: duration,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              delay: delay,
              repeatDelay: 0, // No delay between repeats
            }}
          />
        )
      })}
    </div>
  )
}
