```tsx
"use client"

import { useState, useEffect } from "react"
import { artworks } from "@/data/artworks"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "./language-selector"
import { ImagePreloader } from "./image-preloader"
import { OrientationNotice } from "./orientation-notice"
import { AboutModal } from "./about-modal"
import { PricingModal } from "./pricing-modal"
import { ContactModal } from "./contact-modal"
import { MobileGalleryModal } from "./mobile-gallery-modal"
import { useMobileDetection } from "@/hooks/use-mobile-detection"

export function Portfolio() {
  const { t, isLoaded, language } = useLanguage()
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false)
  const { isMobile } = useMobileDetection()

  // Auto-rotate artwork every 10 seconds after hydration
  useEffect(() => {
    if (!isLoaded) return
    const interval = setInterval(() => {
      setCurrentArtworkIndex((prev) => (prev + 1) % artworks.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [isLoaded])

  // Debug: log index changes
  useEffect(() => {
    console.log("CurrentArtworkIndex:", currentArtworkIndex)
  }, [currentArtworkIndex])

  const currentArtwork = artworks[currentArtworkIndex]

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
      {/* Orientation Notice (معطل) */}
      {false && <OrientationNotice />}

      {/* Preload Images */}
      <ImagePreloader images={artworks.map((artwork) => artwork.image)} />

      {/* Background Image Wrapper keyed for remount */}
      <div
        key={currentArtworkIndex}
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      >
        <picture className="w-full h-full block">
          <source
            media="(max-width: 480px)"
            srcSet={currentArtwork.image.replace(
              "/upload/",
              "/upload/c_scale,w_480,q_90,f_auto/"
            )}
          />
          <source
            media="(max-width: 768px)"
            srcSet={currentArtwork.image.replace(
              "/upload/",
              "/upload/c_scale,w_768,q_90,f_auto/"
            )}
          />
          <source
            media="(max-width: 1024px)"
            srcSet={currentArtwork.image.replace(
              "/upload/",
              "/upload/c_scale,w_1024,q_90,f_auto/"
            )}
          />
          <source
            media="(max-width: 1200px)"
            srcSet={currentArtwork.image.replace(
              "/upload/",
              "/upload/c_scale,w_1200,q_90,f_auto/"
            )}
          />
          <img
            src={currentArtwork.image.replace(
              "/upload/",
              "/upload/c_scale,w_1920,q_90,f_auto/"
            )}
            alt={currentArtwork.title}
            className="w-full h-full object-cover object-center animate-fade-in"
            loading="eager"
            sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1200px) 1200px, 1920px"
            style={{
              minHeight: "100vh",
              minHeight: "100dvh",
              animation: "fadeIn 0.8s ease-in-out",
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Navigation, Hero, Thumbnails, Modals unchanged... */}
    </div>
  )
}
```
