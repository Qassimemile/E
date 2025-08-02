"use client"

import { useState, useEffect } from "react"
import { artworks } from "@/data/artworks"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "./language-selector"
import { ImagePreloader } from "./image-preloader"
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
      {/* Image Preloader */}
      <ImagePreloader images={artworks.map(artwork => artwork.image)} />
      
      {/* Background Image - High Quality Responsive */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <picture className="w-full h-full block">
          <source 
            media="(max-width: 480px)" 
            srcSet={`${currentArtwork.image.replace('/upload/', '/upload/c_scale,w_480,q_90,f_auto/')}`}
          />
          <source 
            media="(max-width: 768px)" 
            srcSet={`${currentArtwork.image.replace('/upload/', '/upload/c_scale,w_768,q_90,f_auto/')}`}
          />
          <source 
            media="(max-width: 1024px)" 
            srcSet={`${currentArtwork.image.replace('/upload/', '/upload/c_scale,w_1024,q_90,f_auto/')}`}
          />
          <source 
            media="(max-width: 1200px)" 
            srcSet={`${currentArtwork.image.replace('/upload/', '/upload/c_scale,w_1200,q_90,f_auto/')}`}
          />
          <img
            src={`${currentArtwork.image.replace('/upload/', '/upload/c_scale,w_1920,q_90,f_auto/')}`}
            alt={currentArtwork.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1200px) 1200px, 1920px"
            style={{
              minHeight: '100vh',
              minHeight: '100dvh'
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation - Mobile Optimized */}
      <nav className="relative z-10 flex justify-between items-center p-3 sm:p-6">
        <div className="flex-1" />
        <div className="flex items-center gap-2 sm:gap-6">
          <button
            onClick={() => setAboutOpen(true)}
            className="text-white font-medium hover:text-blue-300 transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 text-xs sm:text-base"
          >
            {t("about")}
          </button>
          <button
            onClick={() => setPricingOpen(true)}
            className="text-white font-medium hover:text-green-300 transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 text-xs sm:text-base"
          >
            {t("pricing")}
          </button>
          <button
            onClick={() => setContactOpen(true)}
            className="text-white font-medium hover:text-purple-300 transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 text-xs sm:text-base"
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

      {/* Hero Content - Mobile Optimized */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="text-center">
          <h1
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4 leading-tight"
            key={`title-${language}`}
          >
            {t("heroTitle")}
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4 delay-150"
            key={`subtitle-${language}`}
          >
            {t("heroSubtitle")}
          </p>
        </div>
      </div>

      {/* Fixed Thumbnail Strip at Bottom - Mobile Optimized */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center p-2 sm:p-4">
        <div className="p-2 sm:p-4 bg-black/20 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide max-w-xs sm:max-w-4xl">
            {artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                onClick={() => setCurrentArtworkIndex(index)}
                className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                  index === currentArtworkIndex
                    ? "border-white shadow-lg shadow-white/25"
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <picture>
                  <img
                    src={`${artwork.thumbnail || "/placeholder.svg"}`}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="64"
                    height="64"
                  />
                </picture>
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
