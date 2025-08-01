"use client"

import { useState, useEffect } from "react"
import { artworks } from "@/data/artworks"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "./language-selector"
// import { LanguageSelectorAdvanced } from "./language-selector-advanced" // Alternative version
// import { LanguageSelectorMobile } from "./language-selector-mobile" // Mobile-optimized version
import { AboutModal } from "./about-modal"
import { PricingModal } from "./pricing-modal"
import { ContactModal } from "./contact-modal"

export function Portfolio() {
  const { t, isLoaded, language } = useLanguage()
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  // Auto-rotate artwork every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArtworkIndex((prev) => (prev + 1) % artworks.length)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const currentArtwork = artworks[currentArtworkIndex]

  // Loading screen during hydration
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/80 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${currentArtwork.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-4 sm:p-6">
        <div className="flex-1" />
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => setAboutOpen(true)}
            className="text-white font-medium hover:text-blue-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 text-sm sm:text-base"
          >
            {t("about")}
          </button>
          <button
            onClick={() => setPricingOpen(true)}
            className="text-white font-medium hover:text-green-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 text-sm sm:text-base"
          >
            {t("pricing")}
          </button>
          <button
            onClick={() => setContactOpen(true)}
            className="text-white font-medium hover:text-purple-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 text-sm sm:text-base"
          >
            {t("contact")}
          </button>

          {/* Language Selector - Responsive */}
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <div className="block sm:hidden">
            {/* <LanguageSelectorMobile /> */}
            <LanguageSelector />
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 pb-24">
        <div className="text-center">
          <h1
            className="text-6xl sm:text-8xl md:text-9xl font-bold text-white mb-6 drop-shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4"
            key={`title-${language}`}
          >
            {t("heroTitle")}
          </h1>
          <p
            className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4 delay-150"
            key={`subtitle-${language}`}
          >
            {t("heroSubtitle")}
          </p>
        </div>
      </div>

      {/* Fixed Thumbnail Strip at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center p-4">
        <div className="p-4 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide max-w-4xl">
            {artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                onClick={() => setCurrentArtworkIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                  index === currentArtworkIndex
                    ? "border-white shadow-lg shadow-white/25"
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <img
                  src={artwork.thumbnail || "/placeholder.svg"}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
