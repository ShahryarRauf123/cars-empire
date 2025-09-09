"use client" // This component needs to be a client component to use Framer Motion

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Wrench, Palette, Cog } from "lucide-react"
import { motion } from "framer-motion" // Import motion from framer-motion

// Variants for the main container to stagger cards/sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each child's animation
      delayChildren: 0.5, // Initial delay before the first child starts animating
    },
  },
}

// Variants for individual elements within sections
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function RestorationPage() {
  // IMPORTANT: Replace '923001234567' with your actual WhatsApp number (e.g., +923001234567 without spaces or +)
  const whatsappNumber = "923001234567"

  const handleGetQuote = (restorationType: string) => {
    const message = `Hello, I am interested in a quote for *${restorationType}* restoration. Could you please provide more information?`
    const encodedMessage = encodeURIComponent(message)
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappLink, "_blank") // Open in a new tab
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />

      {/* Background Icons */}
      <motion.div
        className="fixed top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 z-[-10] opacity-10 text-primary"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      >
        <Wrench className="h-[50vh] w-[50vh]" /> {/* Large icon */}
      </motion.div>

      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-10] opacity-10 text-primary"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <Palette className="h-[50vh] w-[50vh]" /> {/* Large icon */}
      </motion.div>

      <motion.div
        className="fixed bottom-1/4 right-0 translate-x-1/2 translate-y-1/2 z-[-10] opacity-10 text-primary"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      >
        <Cog className="h-[50vh] w-[50vh]" /> {/* Large icon */}
      </motion.div>

      <main className="container mx-auto px-4 py-8 relative z-0">
        {" "}
        {/* Ensure content is above background icons */}
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            Classic Car Restoration
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            Bring your classic vehicle back to its original glory. Our expert restoration team specializes in vintage
            and classic automobiles with attention to authentic detail and craftsmanship.
          </motion.p>

          <motion.div
            className="grid gap-8 md:grid-cols-3 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible" // Animate on mount
          >
            {/* Mechanical Restoration Card */}
            <motion.div
              className="p-6 border rounded-lg text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Wrench className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Mechanical Restoration</h3>
              <p className="text-muted-foreground text-sm">
                Complete engine rebuilds, transmission overhauls, and mechanical system restoration to original
                specifications.
              </p>
            </motion.div>

            {/* Body & Paint Card */}
            <motion.div
              className="p-6 border rounded-lg text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Palette className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Body & Paint</h3>
              <p className="text-muted-foreground text-sm">
                Professional bodywork, rust repair, and authentic paint matching to restore your vehicle's original
                appearance.
              </p>
            </motion.div>

            {/* Interior Restoration Card */}
            <motion.div
              className="p-6 border rounded-lg text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Cog className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Interior Restoration</h3>
              <p className="text-muted-foreground text-sm">
                Upholstery restoration, dashboard repair, and interior component refurbishment using period-correct
                materials.
              </p>
            </motion.div>
          </motion.div>

          {/* Our Restoration Process Section */}
          <motion.div
            className="bg-muted p-6 rounded-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Restoration Process</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">1. Initial Assessment</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive evaluation of your vehicle's condition and restoration requirements.
                </p>

                <h4 className="font-semibold mb-2">2. Detailed Planning</h4>
                <p className="text-sm text-muted-foreground">
                  Custom restoration plan with timeline, materials list, and cost breakdown.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Expert Restoration</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Skilled craftsmen work on your vehicle using authentic parts and techniques.
                </p>

                <h4 className="font-semibold mb-2">4. Quality Assurance</h4>
                <p className="text-sm text-muted-foreground">
                  Final inspection and testing to ensure everything meets our high standards.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Partial Restoration Card */}
            <motion.div
              className="border rounded-lg p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <h3 className="text-xl font-semibold mb-4">Partial Restoration</h3>
              <p className="text-muted-foreground mb-4">
                Focus on specific areas that need attention while preserving the vehicle's character.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Engine and drivetrain work</li>
                <li>• Bodywork and paint touch-ups</li>
                <li>• Interior repairs</li>
                <li>• Electrical system updates</li>
              </ul>
              <Button className="w-full" onClick={() => handleGetQuote("Partial Restoration")}>
                Get Quote
              </Button>
            </motion.div>

            {/* Complete Restoration Card */}
            <motion.div
              className="border rounded-lg p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <h3 className="text-xl font-semibold mb-4">Complete Restoration</h3>
              <p className="text-muted-foreground mb-4">
                Full frame-off restoration returning your vehicle to showroom condition.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Complete disassembly</li>
                <li>• Frame and body restoration</li>
                <li>• All mechanical systems rebuilt</li>
                <li>• Concours-quality finish</li>
              </ul>
              <Button className="w-full" onClick={() => handleGetQuote("Complete Restoration")}>
                Get Quote
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold mb-4">Ready to Restore Your Classic?</h2>
            <p className="text-muted-foreground mb-6">
              Contact us today for a consultation and let us help bring your classic car back to life.
            </p>
            <Button size="lg" onClick={() => handleGetQuote("General Restoration Consultation")}>
              Schedule Consultation
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
