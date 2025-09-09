"use client"

import { motion } from "framer-motion"

export function AnimatedInspectionBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none flex items-center justify-center">
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000" // Adjusted viewBox for a larger shape
        className="absolute inset-0"
      >
        <motion.path
          // A larger, more abstract blob-like shape
          d="M500 50 C700 0 950 200 900 400 C850 600 600 950 400 900 C200 850 50 600 100 400 C150 200 300 100 500 50 Z"
          stroke="var(--primary)" // Use CSS variable for theme primary color
          strokeWidth="3"
          fill="var(--primary)" // Use CSS variable for theme primary color
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 0.5, // Increased overall opacity for visibility
            fillOpacity: 0.4, // Increased fill opacity for a more solid green background
            scale: 1,
            rotate: 360, // Continuous rotation
          }}
          transition={{
            opacity: { duration: 1, ease: "easeOut" },
            fillOpacity: { duration: 1, ease: "easeOut" },
            scale: { duration: 1, ease: "easeOut" },
            rotate: { duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY }, // Slow continuous rotation
          }}
        />
      </motion.svg>
    </div>
  )
}
