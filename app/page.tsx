"use client" // This component needs to be a client component to use Framer Motion

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion" // Import motion from framer-motion
import { ReviewCarousel } from "@/components/review-carousel" // Import the new ReviewCarousel component

// Define animation variants for staggered appearance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Delay between each character
      delayChildren: 0.5, // Initial delay before the first character starts animating
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, // Added transition for itemVariants
}

// Variants for individual characters in the title
const characterVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

// Define 10 review objects
const reviewsData = [
  {
    id: "1",
    rating: 5,
    text: "Excellent service! They restored my classic car to perfection. Highly recommend their restoration services.",
    author: "John Smith",
  },
  {
    id: "2",
    rating: 5,
    text: "Professional detailing service. My car looks brand new! Great attention to detail and fair pricing.",
    author: "Sarah Johnson",
  },
  {
    id: "3",
    rating: 5,
    text: "Thorough inspection service helped me make an informed purchase. Very knowledgeable team.",
    author: "Mike Davis",
  },
  {
    id: "4",
    rating: 4,
    text: "The ad posting service was quick and effective. Got many inquiries within days. Good value for money.",
    author: "Emily White",
  },
  {
    id: "5",
    rating: 5,
    text: "Needed a specific part for my vintage car, and Cars Empire found it! Their consultation service is top-notch.",
    author: "David Lee",
  },
  {
    id: "6",
    rating: 4,
    text: "The detailing package was comprehensive. My car feels fresh and clean. Will definitely come back.",
    author: "Jessica Brown",
  },
  {
    id: "7",
    rating: 5,
    text: "Impressed with the quality of work on my car's paint correction. It shines like never before!",
    author: "Chris Green",
  },
  {
    id: "8",
    rating: 5,
    text: "The team is very friendly and professional. They explained everything clearly during the inspection.",
    author: "Olivia Wilson",
  },
  {
    id: "9",
    rating: 4,
    text: "Great experience with the purchase car inquiry. They helped me narrow down my options efficiently.",
    author: "Daniel Moore",
  },
  {
    id: "10",
    rating: 5,
    text: "Absolutely thrilled with the full restoration of my old Mustang. It's a masterpiece!",
    author: "Sophia Taylor",
  },
]

export default function HomePage() {
  const titleText = "Cars Empire"

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />

      <main className="container mx-auto px-4 py-8 relative z-0">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section - Now a 3-column grid on medium screens and up */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 py-12 md:py-24">
            {/* Section 1: Text Content */}
            <div className="col-span-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <motion.h1
                className="text-5xl lg:text-6xl font-bold mb-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants} // Apply container variants for staggered children
              >
                {titleText.split("").map((char, index) => (
                  <motion.span key={index} variants={characterVariants} className="inline-block">
                    {char === " " ? "\u00A0" : char} {/* Preserve spaces */}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                Your satisfaction is our priority
              </motion.p>
            </div>
          </div>

          {/* Service Cards Grid */}
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.3 }} // Only animate once when 30% visible
          >
            <motion.div className="p-6 border rounded-lg" variants={itemVariants}>
              <h3 className="font-semibold mb-2">Professional Detailing</h3>
              <p className="text-sm text-muted-foreground">Complete interior and exterior detailing services.</p>
            </motion.div>
            <motion.div className="p-6 border rounded-lg" variants={itemVariants}>
              <h3 className="font-semibold mb-2">Vehicle Inspection</h3>
              <p className="text-sm text-muted-foreground">Thorough inspections for peace of mind.</p>
            </motion.div>
            <motion.div className="p-6 border rounded-lg" variants={itemVariants}>
              <h3 className="font-semibold mb-2">Auto Restoration</h3>
              <p className="text-sm text-muted-foreground">Expert restoration services for classic vehicles.</p>
            </motion.div>
            <motion.div className="p-6 border rounded-lg" variants={itemVariants}>
              <h3 className="font-semibold mb-2">Ad Posting</h3>
              <p className="text-sm text-muted-foreground">Professional vehicle listing and marketing services.</p>
            </motion.div>
            <motion.div className="p-6 border rounded-lg" variants={itemVariants}>
              <h3 className="font-semibold mb-2">Expert Consultation</h3>
              <p className="text-sm text-muted-foreground">Professional advice for all your automotive needs.</p>
            </motion.div>
            <motion.div className="p-6 border rounded-lg" variants={itemVariants}>
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">100% satisfaction guaranteed on all our services.</p>
            </motion.div>
          </motion.div>

          {/* Reviews Section - Now using the ReviewCarousel */}
          <section id="reviews" className="pt-16">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <ReviewCarousel reviews={reviewsData} autoplayInterval={5000} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
