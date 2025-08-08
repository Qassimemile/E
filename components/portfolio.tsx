"use client"

import { useState, useEffect } from "react"
import { artworks } from "@/data/artworks"
import { useLanguage } from "@/contexts/language-context"
import { ImagePreloader } from "./image-preloader"
import { MobileGalleryModal } from "./mobile-gallery-modal"

export function Portfolio() {
  const { t, isLoaded } = useLanguage()
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0)
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false)

  // Start auto-rotate only after hydration
  useEffect(() => {
    if (!isLoaded) return
    const interval = setInterval(() => {
      setCurrentArtworkIndex((prev) => (prev + 1) % artworks.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [isLoaded])

  const currentArtwork = artworks[currentArtworkIndex]

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  // Background-div approach (no stacking <img> tags)
  const bgUrl = currentArtwork.image.replace("/upload/", "/upload/c_scale,w_1920,q_95,f_auto/")

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Single background element keyed to force remount on index change */}
      <div
        key={currentArtworkIndex}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: `url(${bgUrl})`,
          willChange: "opacity, background-image",
        }}
      />

      {/* Preload high-res images */}
      <ImagePreloader images={artworks.map((a) => a.image)} />

      {/* Mobile gallery modal trigger */}
      <button
        className="absolute bottom-4 right-4 p-2 bg-white/20 rounded-full z-40"
        onClick={() => setMobileGalleryOpen(true)}
      >
        Open Gallery
      </button>

      <MobileGalleryModal
        isOpen={mobileGalleryOpen}
        onClose={() => setMobileGalleryOpen(false)}
        artworks={artworks}
        initialIndex={currentArtworkIndex}
        onIndexChange={setCurrentArtworkIndex}
      />
    </div>
  )
}
