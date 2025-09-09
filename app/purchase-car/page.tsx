"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { AnimatedTrafficBackground } from "@/components/animated-traffic-background" // Import the animated background

// Define animation variants for staggered appearance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function PurchaseCarPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    requiredCarModel: "",
    budgetFrom: "",
    budgetTo: "",
    registrationCity: "",
    otherRequirements: "",
  })

  const [progress, setProgress] = useState(0)

  // Define fields that contribute to progress
  const progressFields = [
    "name",
    "contact",
    "location",
    "requiredCarModel",
    "budgetFrom",
    "budgetTo",
    "registrationCity",
    "otherRequirements",
  ]
  const totalProgressFields = progressFields.length

  // Calculate progress whenever formData changes
  useEffect(() => {
    let completedFields = 0
    progressFields.forEach((field) => {
      if (formData[field as keyof typeof formData] && String(formData[field as keyof typeof formData]).trim() !== "") {
        completedFields++
      }
    })

    const newProgress = Math.min(100, (completedFields / totalProgressFields) * 100)
    setProgress(Math.round(newProgress))
  }, [formData])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const messageBody = `
*Car Purchase Inquiry Details:*

*Name:* ${formData.name || "Not specified"}
*Contact (WhatsApp preferred):* ${formData.contact || "Not specified"}
*Location:* ${formData.location || "Not specified"}
*Required Car/Model:* ${formData.requiredCarModel || "Not specified"}
*Budget Range:* ${formData.budgetFrom ? "Rs. " + formData.budgetFrom : "Not specified"} - ${formData.budgetTo ? "Rs. " + formData.budgetTo : "Not specified"}
*Registration City:* ${formData.registrationCity || "Not specified"}

*Any other requirements:*
${formData.otherRequirements || "No additional requirements"}

---
This inquiry was submitted through the Auto Services website.
Please review and contact the customer.
    `.trim()

    // Replace 'YOUR_WHATSAPP_NUMBER' with the actual WhatsApp number (e.g., +923001234567 without spaces or +)
    // For example, if the number is +923001234567, use '923001234567'
    const whatsappNumber = "923001234567" // IMPORTANT: Replace with your actual WhatsApp number
    const encodedMessage = encodeURIComponent(messageBody)
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappLink, "_blank") // Open in a new tab
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      <AnimatedTrafficBackground /> {/* Add the animated background here */}
      <main className="flex-1 container mx-auto px-4 py-8 relative z-0">
        <motion.div className="max-w-2xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 className="text-4xl font-bold mb-6" variants={itemVariants}>
            Inquire About a Car
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground mb-8" variants={itemVariants}>
            Tell us what car you're looking for, and we'll help you find it. Fill out the form below.
          </motion.p>

          {/* Progress Bar */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="text-sm font-medium text-muted-foreground mb-2">Form Progress: {progress}%</div>
            <div className="relative w-full bg-muted rounded-full h-2.5">
              {/* Progress Fill */}
              <motion.div
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              ></motion.div>
            </div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <Input
                id="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium mb-2">
                Contact (WhatsApp preferred) *
              </label>
              <Input
                id="contact"
                placeholder="e.g., +1 (555) 123-4567 or email@example.com"
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Your Location *
              </label>
              <Input
                id="location"
                placeholder="e.g., New York, NY"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="requiredCarModel" className="block text-sm font-medium mb-2">
                Required Car/Model *
              </label>
              <Input
                id="requiredCarModel"
                placeholder="e.g., Honda Civic 2020, SUV, Sports Car"
                value={formData.requiredCarModel}
                onChange={(e) => handleInputChange("requiredCarModel", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="budgetFrom" className="block text-sm font-medium mb-2">
                  Budget Range (From Rs.)
                </label>
                <Input
                  id="budgetFrom"
                  type="number"
                  placeholder="1000000"
                  min="0"
                  value={formData.budgetFrom}
                  onChange={(e) => handleInputChange("budgetFrom", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="budgetTo" className="block text-sm font-medium mb-2">
                  Budget Range (To Rs.)
                </label>
                <Input
                  id="budgetTo"
                  type="number"
                  placeholder="2000000"
                  min="0"
                  value={formData.budgetTo}
                  onChange={(e) => handleInputChange("budgetTo", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="registrationCity" className="block text-sm font-medium mb-2">
                Preferred Registration City
              </label>
              <Input
                id="registrationCity"
                placeholder="e.g., Los Angeles"
                value={formData.registrationCity}
                onChange={(e) => handleInputChange("registrationCity", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="otherRequirements" className="block text-sm font-medium mb-2">
                Any other requirements
              </label>
              <Textarea
                id="otherRequirements"
                placeholder="e.g., specific features, color, condition preferences..."
                className="min-h-[120px]"
                value={formData.otherRequirements}
                onChange={(e) => handleInputChange("otherRequirements", e.target.value)}
              />
            </div>

            <motion.div className="bg-muted p-4 rounded-lg" variants={itemVariants}>
              <h3 className="font-semibold mb-2">How it works:</h3>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Fill out the form above with your car requirements.</li>
                <li>2. Click "Submit Inquiry" to open your WhatsApp app.</li>
                <li>3. Review the pre-filled message and send it to us.</li>
                <li>4. We'll review your request and get back to you with options within 24-48 hours.</li>
              </ol>
            </motion.div>

            <Button type="submit" className="w-full">
              Submit Inquiry
            </Button>
          </motion.form>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
