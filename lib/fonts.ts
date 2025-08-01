import { Inter } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
})

// For Arabic and Hebrew, we'll use system fonts that are commonly available
export const arabicFont = {
  fontFamily: 'Tahoma, "Segoe UI", Arial, sans-serif',
}

export const hebrewFont = {
  fontFamily: 'Arial, "Segoe UI", Tahoma, sans-serif',
}
