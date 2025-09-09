"use client" // This component needs to be a client component to use Framer Motion

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, FileText } from "lucide-react"
import { motion } from "framer-motion" // Import motion from framer-motion
import { AnimatedInspectionBackground } from "@/components/animated-inspection-background" // Import the new component

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

export default function InspectionPage() {
  // IMPORTANT: Replace '923001234567' with your actual WhatsApp number (e.g., +923001234567 without spaces or +)
  const whatsappNumber = "923001234567"

  const handleScheduleInspection = (packageName: string) => {
    const message = `Hello, I would like to schedule the *${packageName}* inspection service. Please provide more details and availability.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappLink, "_blank") // Open in a new tab
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      <AnimatedInspectionBackground /> {/* Add the animated background here */}
      <main className="container mx-auto px-4 py-8 relative z-0">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            Vehicle Inspection Services
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            Get a comprehensive inspection report before buying or selling a vehicle. Our certified inspectors provide
            detailed assessments to help you make informed decisions.
          </motion.p>

          <motion.div
            className="grid gap-6 md:grid-cols-2 mb-12"
            variants={cardGridVariants}
            initial="hidden"
            animate="visible" // Animate on mount
          >
            {/* Basic Inspection Service Card */}
            <motion.div
              className="p-6 border rounded-lg"
              variants={cardItemVariants} // Card box appears
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <motion.h3 className="text-xl font-semibold mb-4 flex items-center gap-2" variants={cardItemVariants}>
                <CheckCircle className="h-5 w-5 text-primary" />
                Basic Inspection Service
              </motion.h3>
              <motion.div className="text-2xl font-bold mb-4" variants={cardItemVariants}>
                Rs. 4,999
              </motion.div>
              <motion.ul className="space-y-2 text-sm mb-4" variants={cardItemVariants}>
                <li>• Paint Check</li>
                <li>• Engine Check</li>
                <li>• Accident Evaluation</li>
                <li>• Suspension Check</li>
                <li>• Expert Opinion by Inspector</li>
              </motion.ul>
              <motion.div variants={cardItemVariants}>
                <Button className="w-full" onClick={() => handleScheduleInspection("Basic Inspection Service")}>
                  Schedule Inspection
                </Button>
              </motion.div>
            </motion.div>

            {/* Premium Inspection Service Card */}
            <motion.div
              className="p-6 border rounded-lg"
              variants={cardItemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <motion.h3 className="text-xl font-semibold mb-4 flex items-center gap-2" variants={cardItemVariants}>
                <FileText className="h-5 w-5 text-primary" />
                Premium Inspection Service
              </motion.h3>
              <motion.div className="text-2xl font-bold mb-4" variants={cardItemVariants}>
                Rs. 7,999
              </motion.div>
              <motion.ul className="space-y-2 text-sm mb-4" variants={cardItemVariants}>
                <li>• Detailed Paint Check (using Ancel device)</li>
                <li>• Engine Health Scan (OBD2 Scanner – full diagnostics)</li>
                <li>• Battery Health Test</li>
                <li>• Paint & Seals Verification</li>
                <li>• Odometer (Meter Reverse) Check</li>
                <li>• Suspension Check</li>
                <li>• Tyre Condition Report</li>
                <li>• Poteen Application Quantity Check</li>
                <li>• Document Verification</li>
                <li>• Final Recommendation: Buy or Skip – Based on Complete Evaluation</li>
              </motion.ul>
              <motion.div variants={cardItemVariants}>
                <Button className="w-full" onClick={() => handleScheduleInspection("Premium Inspection Service")}>
                  Schedule Inspection
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* What's Included in Every Inspection Section */}
          <motion.div
            className="bg-muted p-6 rounded-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold mb-4">What's Included in Every Inspection</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-2">Mechanical Systems</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Engine performance</li>
                  <li>• Transmission operation</li>
                  <li>• Cooling system</li>
                  <li>• Exhaust system</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Safety Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Brake system</li>
                  <li>• Steering components</li>
                  <li>• Suspension system</li>
                  <li>• Tire condition</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Electrical & Interior</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Battery and charging</li>
                  <li>• Lights and signals</li>
                  <li>• Interior components</li>
                  <li>• Air conditioning</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Why Get an Inspection? Section */}
          <motion.div
            className="border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Why Get an Inspection?</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">For Buyers</h4>
                <p className="text-sm text-muted-foreground">
                  Avoid costly surprises and negotiate with confidence. Our inspection can save you thousands by
                  identifying hidden problems before you buy.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">For Sellers</h4>
                <p className="text-sm text-muted-foreground">
                  Build buyer confidence and potentially increase your selling price by providing a professional
                  inspection report upfront.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
