"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// The `cn` utility is no longer needed here as pagination dots are removed.
// import { cn } from "@/lib/utils"

interface Review {
  id: string
  rating: number
  text: string
  author: string
}

interface ReviewCarouselProps {
  reviews: Review[] // Re-added the reviews prop
  autoplayInterval?: number // in milliseconds
}

export function ReviewCarousel({ reviews, autoplayInterval = 8000 }: ReviewCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0])
  // reviewsPerPage is 1, as before
  // const reviewsPerPage = 1 // Display one review at a time
  // const totalPages = Math.ceil(reviews.length / reviewsPerPage) // No longer needed for dots

  const reviewIndex = page % reviews.length // Loop through reviews

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection])
  }

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1) // Move to the next review
    }, autoplayInterval)

    return () => clearInterval(timer) // Clean up on unmount
  }, [autoplayInterval, reviews.length]) // Re-run if interval or reviews change

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative h-[250px] sm:h-[200px] md:h-[180px] lg:h-[160px] flex items-center justify-center overflow-hidden rounded-lg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={reviewIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full"
          >
            <Card className="p-6 border rounded-lg bg-card">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">{"★".repeat(reviews[reviewIndex].rating)}</div>
                </div>
                <p className="text-muted-foreground mb-4 text-base">{reviews[reviewIndex].text}</p>
                <div className="font-semibold text-sm">- {reviews[reviewIndex].author}</div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-0 -translate-y-1/2 z-10"
        onClick={() => paginate(-1)}
        aria-label="Previous review"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-0 -translate-y-1/2 z-10"
        onClick={() => paginate(1)}
        aria-label="Next review"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Pagination Dots removed */}
    </div>
  )
}
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}
