"use client" // This component needs to be a client component to use Framer Motion

import type React from "react"

import { useState } from "react" // Import useState
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion" // Import motion from framer-motion
import { Footer } from "@/components/footer" // Ensure Footer is imported

// Variants for the main container to stagger sections
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

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  // IMPORTANT: Replace '923001234567' with your actual WhatsApp number (e.g., +923001234567 without spaces or +)
  const whatsappNumber = "92123123123" // Updated WhatsApp number

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const messageBody = `
*Contact Inquiry from Website:*

*Name:* ${formData.firstName || "N/A"} ${formData.lastName || "N/A"}
*Email:* ${formData.email || "N/A"}
*Phone:* ${formData.phone || "N/A"}
*Service Interested In:* ${formData.service || "N/A"}
*Message:*
${formData.message || "No message provided."}

---
This inquiry was submitted through the Auto Services website.
    `.trim()

    const encodedMessage = encodeURIComponent(messageBody)
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappLink, "_blank") // Open in a new tab
  }

  return (
    <div className="min-h-screen relative">
      <Navbar />
      {/* Rotating Logo for Desktop (fixed) */}
      <motion.div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-0 rounded-full flex items-center justify-center hidden md:flex" // Added hidden md:flex
        animate={{ rotate: 360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 15, ease: "linear" }} // Continuous slow rotation
      >
        <img
          src="/car-logo.png?height=96&width=96" // Small size, e.g., 96x96px
          alt="Rotating Logo"
          className="w-24 h-24 opacity-70" // Increased opacity for visibility
        />
      </motion.div>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            Get in touch with our team for any questions about our services or to schedule an appointment.
          </motion.p>

          <motion.div
            className="grid gap-8 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible" // Animate on mount
          >
            {/* Send us a message section */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="Ahmed"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Khan"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ahmed.khan@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="03XX-XXXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Interested In
                  </label>
                  <Input
                    id="service"
                    placeholder="e.g., Car Detailing, Engine Repair"
                    value={formData.service}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="I need a quote for my Honda Civic's detailing..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full" asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Send Message
                  </motion.button>
                </Button>
              </form>
            </motion.div>

            {/* Get in touch section */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">0301-0542844</p>
                    <p className="text-sm text-muted-foreground">Working 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">info@carsempire.pk</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">
                      Hanna Road, G-8/4
                      <br />
                      Islamabad, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <div className="text-muted-foreground text-sm">
                      <p>24/7 Availability</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-8 p-4 bg-muted rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="font-semibold mb-2">Emergency Services</h3>
                <p className="text-sm text-muted-foreground">
                  For urgent automotive needs, call our emergency line at
                  <span className="font-medium"> 0301-0542844</span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      {/* Rotating Logo for Mobile (fixed at bottom) */}
      <motion.div
        className="fixed bottom-4 right-4 z-40 rounded-full flex items-center justify-center md:hidden" // Fixed position, bottom-4 for margin, right-4 for right side, z-40 to be above footer
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.7, scale: 1, rotate: 360 }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          scale: { duration: 0.8, ease: "easeOut" },
          rotate: { repeat: Number.POSITIVE_INFINITY, duration: 15, ease: "linear" },
        }}
      >
        <img src="/car-logo.png?height=96&width=96" alt="Rotating Logo" className="w-24 h-24 opacity-70" />
      </motion.div>
      <Footer />
    </div>
  )
}
