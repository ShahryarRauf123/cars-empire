import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PageLoader } from "@/components/page-loader"
import { ThemeProvider } from "@/components/theme-provider" // Ensure this is imported

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Car's Empire",
  description: "Professional automotive services",
  icons: "/favicon.ico",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          // defaultTheme="system" // Removed defaultTheme to let system preference take over
          enableSystem={true} // Enable system theme detection
          disableTransitionOnChange
        >
          <PageLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
