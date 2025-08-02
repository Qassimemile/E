"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Artwork } from "@/data/artworks"

interface MobileGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  artworks: Artwork[]
  initialIndex: number
  onIndexChange?: (index: number) => void
}

export function MobileGalleryModal({
  isOpen,
  onClose,
  artworks,
  initialIndex,
  onIndexChange,
}: MobileGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchDistance, setTouchDistance] = useState(0)
  const [initialPinchDistance, setInitialPinchDistance] = useState(0)
  const [initialScale, setInitialScale] = useState(1)

  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  // Reset state when modal opens/closes or index changes
  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
      setIsLoading(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, currentIndex])

  // Update parent component when index changes
  useEffect(() => {
    onIndexChange?.(currentIndex)
  }, [currentIndex, onIndexChange])

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length)
  }, [artworks.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length)
  }, [artworks.length])

  // Zoom functions
  const zoomIn = () => {
    setScale((prev) => Math.min(prev * 1.5, 4))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev / 1.5, 1))
    if (scale <= 1.5) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Touch distance calculation
  const getTouchDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0
    const touch1 = touches[0]
    const touch2 = touches[1]
    return Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2))
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      setIsDragging(true)
    } else if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches)
      setInitialPinchDistance(distance)
      setInitialScale(scale)
      setTouchDistance(distance)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()

    if (e.touches.length === 2) {
      // Pinch to zoom
      const distance = getTouchDistance(e.touches)
      if (initialPinchDistance > 0) {
        const scaleChange = distance / initialPinchDistance
        const newScale = Math.max(1, Math.min(4, initialScale * scaleChange))
        setScale(newScale)
      }
    } else if (e.touches.length === 1 && isDragging) {
      // Pan when zoomed
      if (scale > 1) {
        const deltaX = e.touches[0].clientX - touchStart.x
        const deltaY = e.touches[0].clientY - touchStart.y
        setPosition((prev) => ({
          x: prev.x + deltaX * 0.5,
          y: prev.y + deltaY * 0.5,
        }))
        setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsDragging(false)
      setInitialPinchDistance(0)

      // Handle swipe navigation (only when not zoomed)
      if (scale === 1 && Math.abs(position.x) < 50 && Math.abs(position.y) < 50) {
        const deltaX = e.changedTouches[0].clientX - touchStart.x
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStart.y)

        // Horizontal swipe (and not too much vertical movement)
        if (Math.abs(deltaX) > 50 && deltaY < 100) {
          if (deltaX > 0) {
            goToPrevious()
          } else {
            goToNext()
          }
        }
      }

      // Reset position if not significantly moved
      if (scale === 1) {
        setPosition({ x: 0, y: 0 })
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
        case "+":
        case "=":
          zoomIn()
          break
        case "-":
          zoomOut()
          break
        case "0":
          resetZoom()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, goToPrevious, goToNext, onClose, zoomOut])

  if (!isOpen) return null

  const currentArtwork = artworks[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header with controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm font-medium">
              {currentIndex + 1} / {artworks.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <button
              onClick={zoomOut}
              disabled={scale <= 1}
              className="p-2 rounded-full bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <button
              onClick={zoomIn}
              disabled={scale >= 4}
              className="p-2 rounded-full bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <button
              onClick={resetZoom}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main image container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: "center center",
          }}
        >
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* High-quality image */}
          <img
            ref={imageRef}
            src={currentArtwork.image.replace("/upload/", "/upload/c_scale,w_1200,q_95,f_auto/") || "/placeholder.svg"}
            alt={currentArtwork.title}
            className="max-w-[90vw] max-h-[80vh] object-contain"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            draggable={false}
          />
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom info panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="text-center">
          <p className="text-white/70 text-sm">Swipe left/right to navigate • Pinch to zoom • Tap controls to zoom</p>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-20 left-0 right-0 px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center">
          {artworks.map((artwork, index) => (
            <button
              key={artwork.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex ? "border-white shadow-lg" : "border-white/30 hover:border-white/60"
              }`}
            >
              <img
                src={artwork.thumbnail || "/placeholder.svg"}
                alt={artwork.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
