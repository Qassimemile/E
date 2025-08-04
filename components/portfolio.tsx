```tsx
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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Only one picture element, keyed by index to remount cleanly */}
      <picture key={currentArtworkIndex} className="absolute inset-0 w-full h-full">
        <source media="(max-width: 768px)" srcSet={currentArtwork.image.replace("/upload/", "/upload/c_scale,w_768,q_90,f_auto/")} />
        <img
          src={currentArtwork.image.replace("/upload/", "/upload/c_scale,w_1920,q_90,f_auto/")}
          alt={currentArtwork.title}
          className="w-full h-full object-cover transition-opacity duration-1000 opacity-0 animate-fade-in"
          onAnimationEnd={(e) => (e.currentTarget.style.opacity = "1")}
        />
      </picture>

      {/* Preload high-res images */}
      <ImagePreloader images={artworks.map((a) => a.image)} />

      {/* Mobile gallery modal trigger */}
      <button
        className="absolute bottom-4 right-4 p-2 bg-white/20 rounded-full"
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </div>
  )
}
```
