"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Sun, Moon } from "lucide-react" // Import Sun and Moon icons
import { motion } from "framer-motion" // Import motion from framer-motion
import { useTheme } from "next-themes" // Import useTheme hook

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Ad Posting", href: "/ad-posting" },
  { name: "Purchase Car", href: "/purchase-car" }, // Add this line
  { name: "Detailing", href: "/detailing" },
  { name: "Inspection", href: "/inspection" },
  { name: "Restoration", href: "/restoration" },
  { name: "Contact Us", href: "/contact-us" },
]

// Animation variants for navbar items
const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
}

const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Stagger delay for each nav item
      delayChildren: 0.5, // Initial delay for all nav items
    },
  },
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const { theme, setTheme } = useTheme() // Use the theme hook
  const [mounted, setMounted] = React.useState(false) // State to track if component is mounted

  // useEffect to ensure component is mounted before accessing theme
  React.useEffect(() => {
    setMounted(true)
    console.log("Navbar mounted. Initial theme:", theme) // Log initial theme on mount
  }, []) // Run only once after initial render

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mr-4">
        {/* Logo */}
        <Link href="/" className="pl-10 flex items-center space-x-2 group">
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 transition-transform group-hover:scale-110">
            <img src="/car-logo.png?height=40&width=40" alt="Logo" className="h-12 w-12 object-cover" />
          </div>
          <span className="font-bold text-xl transition-colors group-hover:text-primary">Cars Empire</span>
        </Link>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:flex items-center space-x-1"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <motion.div key={item.name} variants={navItemVariants}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10",
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Button and Theme Toggle */}
        <motion.div
          className="hidden md:flex items-center space-x-2" // Added items-center space-x-2 for alignment
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        >
          <Button asChild className="transition-all duration-200 hover:scale-105">
            <Link href="#reviews" className="scroll-smooth">
              Reviews
            </Link>
          </Button>
          {/* Theme Toggle Button for Desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (!mounted) return // Prevent action if not mounted yet
              const newTheme = theme === "dark" ? "light" : "dark"
              console.log("Current theme before toggle:", theme)
              console.log("Attempting to set theme to:", newTheme)
              setTheme(newTheme)
            }}
            className="transition-transform hover:scale-110"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="transition-transform hover:scale-110">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <motion.div
              className="flex flex-col space-y-4 mt-4"
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <motion.div key={item.name} variants={navItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-colors border-l-2",
                        isActive
                          ? "bg-primary text-primary-foreground border-l-primary"
                          : "text-muted-foreground border-l-transparent hover:text-foreground hover:bg-primary/10 hover:border-l-primary",
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
              <div className="pt-4 flex flex-col space-y-4">
                {" "}
                {/* Added flex-col space-y-4 for mobile buttons */}
                <Button
                  asChild
                  className="w-full transition-all duration-200 hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="#reviews" className="scroll-smooth">
                    Reviews
                  </Link>
                </Button>
                {/* Theme Toggle Button for Mobile */}
                <Button
                  variant="outline" // Using outline variant for better contrast in mobile menu
                  className="w-full bg-transparent"
                  onClick={() => {
                    if (!mounted) return // Prevent action if not mounted yet
                    const newTheme = theme === "dark" ? "light" : "dark"
                    console.log("Current theme before toggle (mobile):", theme)
                    console.log("Attempting to set theme to (mobile):", newTheme)
                    setTheme(newTheme)
                    setIsOpen(false) // Close sheet after toggling
                  }}
                >
                  {mounted && theme === "dark" ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" /> Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
