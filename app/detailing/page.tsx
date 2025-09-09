"use client" // This component needs to be a client component to use Framer Motion

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { motion } from "framer-motion" // Import motion from framer-motion
import { AnimatedCardBorder } from "@/components/animated-card-border" // Import the new component
import { AnimatedTrafficBackground } from "@/components/animated-traffic-background" // Import the animated background

// Variants for the main container to stagger cards
const cardGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card's animation
      delayChildren: 0.5, // Initial delay before the first card starts animating
    },
  },
}

// Variants for individual elements within each card
const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function DetailingPage() {
  // IMPORTANT: Replace '923001234567' with your actual WhatsApp number (e.g., +923001234567 without spaces or +)
  const whatsappNumber = "923001234567"

  const handleBookNow = (packageName: string) => {
    const message = `Hello, I would like to book the *${packageName}* detailing package. Please provide more details and availability.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappLink, "_blank") // Open in a new tab
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      <AnimatedTrafficBackground /> {/* Add the animated background here */}
      <main className="container mx-auto px-4 py-8 relative z-0">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            Professional Auto Detailing
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            Transform your vehicle with our comprehensive detailing services. We use premium products and techniques to
            restore your car's showroom shine.
          </motion.p>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12"
            variants={cardGridVariants}
            initial="hidden"
            animate="visible" // Animate on mount
          >
            {/* Basic Detail Card */}
            <AnimatedCardBorder className="p-6 border rounded-lg flex flex-col">
              {" "}
              {/* Added flex-col */}
              <motion.h3 className="text-xl font-semibold mb-4" variants={cardItemVariants}>
                Basic Car Wash
              </motion.h3>
              <motion.div className="text-2xl font-bold mb-4" variants={cardItemVariants}>
                5000 PKR
              </motion.div>
              <motion.ul className="space-y-2 mb-6 flex-grow" variants={cardItemVariants}>
                {" "}
                {/* Added flex-grow */}
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic Car wash</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Detailing Inside out</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Trunk Wash</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Engine Wash</span>
                </li>
                {/* Placeholder for alignment */}
                <li className="flex items-center gap-2 opacity-0">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Placeholder</span>
                </li>
                <li className="flex items-center gap-2 opacity-0">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Placeholder</span>
                </li>
                <li className="flex items-center gap-2 opacity-0">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Placeholder</span>
                </li>
              </motion.ul>
              <motion.div variants={cardItemVariants}>
                <Button className="w-full" onClick={() => handleBookNow("Basic Car Wash")}>
                  Book Now
                </Button>
              </motion.div>
            </AnimatedCardBorder>

            {/* Premium Detail Card */}
            <AnimatedCardBorder className="p-6 border rounded-lg flex flex-col">
              {" "}
              {/* Added flex-col */}
              <motion.h3 className="text-xl font-semibold mb-4" variants={cardItemVariants}>
                Premium Package
              </motion.h3>
              <motion.div className="text-2xl font-bold mb-4" variants={cardItemVariants}>
                8000 PKR
              </motion.div>
              <motion.ul className="space-y-2 mb-6 flex-grow" variants={cardItemVariants}>
                {" "}
                {/* Added flex-grow */}
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Opening of body parts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Detailing inside out</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Trunk Wash</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Engine Wash</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">All removed body parts will be washed</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Compound</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Interior Lubrication</span>
                </li>
              </motion.ul>
              <motion.div variants={cardItemVariants}>
                <Button className="w-full" onClick={() => handleBookNow("Premium Package")}>
                  Book Now
                </Button>
              </motion.div>
            </AnimatedCardBorder>

            {/* Ultimate Detail Card */}
            <AnimatedCardBorder className="p-6 border rounded-lg flex flex-col">
              {" "}
              {/* Added flex-col */}
              <motion.h3 className="text-xl font-semibold mb-4" variants={cardItemVariants}>
                Ultimate Package
              </motion.h3>
              <motion.div className="text-2xl font-bold mb-4" variants={cardItemVariants}>
                12000 PKR
              </motion.div>
              <motion.ul className="space-y-2 mb-6 flex-grow" variants={cardItemVariants}>
                {" "}
                {/* Added flex-grow */}
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">All in Premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">1 year glass coat</span>
                </li>
                {/* Placeholder for alignment */}
                <li className="flex items-center gap-2 opacity-0">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Placeholder</span>
                </li>
                <li className="flex items-center gap-2 opacity-0">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Placeholder</span>
                </li>
                <li className="flex items-center gap-2 opacity-0">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Placeholder</span>
                </li>
                <li className="flex items-center gap-2 opacity-0">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Placeholder</span>
                </li>
                <li className="flex items-center gap-2 opacity-0">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Placeholder</span>
                </li>
              </motion.ul>
              <motion.div variants={cardItemVariants}>
                <Button className="w-full" onClick={() => handleBookNow("Ultimate Package")}>
                  Book Now
                </Button>
              </motion.div>
            </AnimatedCardBorder>
          </motion.div>

          {/* Why Choose Our Detailing Service? Section */}
          <motion.div
            className="bg-muted p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold mb-4">Why Choose Our Detailing Service?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Premium Products</h4>
                <p className="text-sm text-muted-foreground">
                  We use only the highest quality detailing products and equipment.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Experienced Team</h4>
                <p className="text-sm text-muted-foreground">
                  Our certified detailers have years of experience with all vehicle types.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Satisfaction Guarantee</h4>
                <p className="text-sm text-muted-foreground">
                  We stand behind our work with a 100% satisfaction guarantee.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Convenient Scheduling</h4>
                <p className="text-sm text-muted-foreground">Flexible appointment times to fit your busy schedule.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
