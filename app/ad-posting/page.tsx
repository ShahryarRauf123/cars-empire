"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Import Select components
import { motion } from "framer-motion"
import { Check } from "lucide-react" // Import Check icon for lists

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

// Define ad packages data
const adPackages = {
  "simple-ad": {
    name: "Simple Ad",
    cost: "Rs. 600",
    details: ["Reach: 15K - 20K", "Platform: Instagram Only"],
  },
  "boosted-ad": {
    name: "Boosted Ad",
    cost: "Rs. 900",
    details: [
      "Reach: 30K - 60K",
      "Platform: Instagram, TikTok",
      "Boosted on Instagram Only",
      "One Reel Repost",
      "One Free Story Repost",
    ],
  },
  "boosted-plus-ad": {
    name: "Boosted-Plus Ad",
    cost: "Rs. 1500",
    details: [
      "Reach: 60K - 100K",
      "Platform: Instagram, TikTok, 5 WhatsApp Groups",
      "Boosted on Instagram and TikTok",
      "2 Free Story Reposts Afterwards",
      "2 Free Reel Reposts",
    ],
  },
}

export default function AdPostingPage() {
  const [formData, setFormData] = useState({
    adPackage: "", // New field for selected ad package
    model: "",
    instagram: "",
    registrationCity: "",
    registrationYear: "",
    engineCapacity: "",
    mileage: "",
    features: "",
    aftermarketEquipments: "",
    paintCondition: "",
    documents: "",
    suspension: "",
    tyres: "",
    accidentalCondition: "",
    biometric: "",
    demand: "",
    contact: "",
    location: "",
  })

  const [progress, setProgress] = useState(0)

  // Define fields that contribute to progress (including adPackage)
  const progressFields = [
    "adPackage", // Ad package is now a required field for progress
    "model",
    "instagram",
    "registrationCity",
    "registrationYear",
    "engineCapacity",
    "mileage",
    "features",
    "aftermarketEquipments",
    "paintCondition",
    "documents",
    "suspension",
    "tyres",
    "accidentalCondition",
    "biometric",
    "demand",
    "contact",
    "location",
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

    const selectedPackageDetails = adPackages[formData.adPackage as keyof typeof adPackages] || {
      name: "Not Selected",
      cost: "N/A",
      details: [],
    }

    const messageBody = `
*Vehicle Advertisement Details:*

*Selected Ad Package:* ${selectedPackageDetails.name} (Cost: ${selectedPackageDetails.cost})
*Model:* ${formData.model || "Not specified"}
*Instagram:* @${formData.instagram || "Not specified"}
*Registration City:* ${formData.registrationCity || "Not specified"}
*Registration Year:* ${formData.registrationYear || "Not specified"}
*Engine Capacity:* ${formData.engineCapacity ? formData.engineCapacity + "cc" : "Not specified"}
*Mileage:* ${formData.mileage ? formData.mileage + " km" : "Not specified"}
*Features:* ${formData.features || "Not specified"}
*Aftermarket Equipments:* ${formData.aftermarketEquipments || "None"}
*Paint Condition:* ${formData.paintCondition || "Not specified"}
*Documents:* ${formData.documents || "Not specified"}
*Suspension:* ${formData.suspension || "Not specified"}
*Tyres:* ${formData.tyres || "Not specified"}
*Accidental Condition:* ${formData.accidentalCondition || "Not specified"}
*Biometric:* ${formData.biometric || "Not specified"}
*Demand:* ${formData.demand ? "Rs. " + formData.demand : "Not specified"}
*Contact:* ${formData.contact || "Not provided"}
*Location:* ${formData.location || "Not specified"}

---
This advertisement was submitted through the Auto Services website.
Please review and proceed with posting.
    `.trim()

    // Replace 'YOUR_WHATSAPP_NUMBER' with the actual WhatsApp number (e.g., +923001234567 without spaces or +)
    // For example, if the number is +923001234567, use '923001234567'
    const whatsappNumber = "923001234567" // IMPORTANT: Replace with your actual WhatsApp number
    const encodedMessage = encodeURIComponent(messageBody)
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappLink, "_blank") // Open in a new tab
  }

  const selectedPackageDetails = adPackages[formData.adPackage as keyof typeof adPackages]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 relative z-0">
        <motion.div className="max-w-2xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 className="text-4xl font-bold mb-6" variants={itemVariants}>
            Post Your Vehicle Ad
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground mb-8" variants={itemVariants}>
            Create a detailed listing for your vehicle. First, select your ad package, then fill out the form below.
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
            {/* Ad Package Selection */}
            <motion.div className="mb-8 p-6 border rounded-lg bg-card" variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Select Your Ad Package *</h2>
              <label htmlFor="adPackage" className="block text-sm font-medium mb-2 sr-only">
                Ad Package
              </label>
              <Select
                value={formData.adPackage}
                onValueChange={(value) => handleInputChange("adPackage", value)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose an Ad Package" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(adPackages).map(([key, pkg]) => (
                    <SelectItem key={key} value={key}>
                      {pkg.name} - {pkg.cost}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedPackageDetails && (
                <motion.div
                  className="mt-6 p-4 bg-muted rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="font-semibold mb-2">{selectedPackageDetails.name} Details:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {selectedPackageDetails.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>

            {/* Existing Form Fields */}
            <div>
              <label htmlFor="model" className="block text-sm font-medium mb-2">
                Model *
              </label>
              <Input
                id="model"
                placeholder="e.g., Honda Civic 2020"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="instagram" className="block text-sm font-medium mb-2">
                Instagram (@)
              </label>
              <Input
                id="instagram"
                placeholder="e.g., your_username"
                value={formData.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="registrationCity" className="block text-sm font-medium mb-2">
                  Registration City *
                </label>
                <Input
                  id="registrationCity"
                  placeholder="e.g., Lahore, Karachi"
                  value={formData.registrationCity}
                  onChange={(e) => handleInputChange("registrationCity", e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="registrationYear" className="block text-sm font-medium mb-2">
                  Registration Year *
                </label>
                <Input
                  id="registrationYear"
                  type="number"
                  placeholder="2020"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.registrationYear}
                  onChange={(e) => handleInputChange("registrationYear", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="engineCapacity" className="block text-sm font-medium mb-2">
                  Engine Capacity (cc)
                </label>
                <Input
                  id="engineCapacity"
                  type="number"
                  placeholder="1800"
                  min="0"
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="mileage" className="block text-sm font-medium mb-2">
                  Mileage (km) *
                </label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="50000"
                  min="0"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="features" className="block text-sm font-medium mb-2">
                Features
              </label>
              <Textarea
                id="features"
                placeholder="List key features (e.g., Sunroof, ABS, Power Steering)"
                className="min-h-[80px]"
                value={formData.features}
                onChange={(e) => handleInputChange("features", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="aftermarketEquipments" className="block text-sm font-medium mb-2">
                Aftermarket Equipments
              </label>
              <Textarea
                id="aftermarketEquipments"
                placeholder="Describe any modifications or aftermarket parts"
                className="min-h-[80px]"
                value={formData.aftermarketEquipments}
                onChange={(e) => handleInputChange("aftermarketEquipments", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="paintCondition" className="block text-sm font-medium mb-2">
                Paint Condition *
              </label>
              <Input
                id="paintCondition"
                placeholder="e.g., Original, Repainted, Minor Scratches"
                value={formData.paintCondition}
                onChange={(e) => handleInputChange("paintCondition", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="documents" className="block text-sm font-medium mb-2">
                Documents *
              </label>
              <Input
                id="documents"
                placeholder="e.g., Original, Duplicate, Open Letter"
                value={formData.documents}
                onChange={(e) => handleInputChange("documents", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="suspension" className="block text-sm font-medium mb-2">
                Suspension *
              </label>
              <Input
                id="suspension"
                placeholder="e.g., Good, Needs Work"
                value={formData.suspension}
                onChange={(e) => handleInputChange("suspension", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="tyres" className="block text-sm font-medium mb-2">
                Tyres *
              </label>
              <Input
                id="tyres"
                placeholder="e.g., New, 50% Worn, Needs Replacement"
                value={formData.tyres}
                onChange={(e) => handleInputChange("tyres", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="accidentalCondition" className="block text-sm font-medium mb-2">
                Accidental Condition *
              </label>
              <Input
                id="accidentalCondition"
                placeholder="e.g., Never Accidental, Minor Accident, Major Accident"
                value={formData.accidentalCondition}
                onChange={(e) => handleInputChange("accidentalCondition", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="biometric" className="block text-sm font-medium mb-2">
                Biometric *
              </label>
              <Input
                id="biometric"
                placeholder="e.g., Available, Not Available"
                value={formData.biometric}
                onChange={(e) => handleInputChange("biometric", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="demand" className="block text-sm font-medium mb-2">
                Demand (Rs.) *
              </label>
              <Input
                id="demand"
                type="number"
                placeholder="1500000"
                min="0"
                value={formData.demand}
                onChange={(e) => handleInputChange("demand", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium mb-2">
                Contact Number *
              </label>
              <Input
                id="contact"
                placeholder="e.g., +92 3XX XXXXXXX"
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Location *
              </label>
              <Input
                id="location"
                placeholder="e.g., DHA Phase 5, Lahore"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>

            <motion.div className="bg-muted p-4 rounded-lg" variants={itemVariants}>
              <h3 className="font-semibold mb-2">How it works:</h3>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Select your desired ad package.</li>
                <li>2. Fill out the form above with your vehicle details.</li>
                <li>3. Click "Post Advertisement" to open your email app.</li>
                <li>4. Review the pre-filled email and send it to us.</li>
                <li>5. We'll process your listing and get back to you within 24 hours.</li>
              </ol>
            </motion.div>

            <Button type="submit" className="w-full">
              Post Advertisement
            </Button>
          </motion.form>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
