"use client"

import { useEffect } from "react"

interface ImagePreloaderProps {
  images: string[]
}

export function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        // Preload different sizes for responsive images with enhanced mobile support
        const sizes = [
          src.replace('/upload/', '/upload/c_scale,w_480,q_auto,f_auto/'), // Extra small mobile
          src.replace('/upload/', '/upload/c_scale,w_768,q_auto,f_auto/'), // Mobile
          src.replace('/upload/', '/upload/c_scale,w_1024,q_auto,f_auto/'), // Tablet
          src.replace('/upload/', '/upload/c_scale,w_1200,q_auto,f_auto/'), // Small desktop
          src.replace('/upload/', '/upload/c_scale,w_1920,q_auto,f_auto/')  // Large desktop
        ]
        
        sizes.forEach((sizeSrc) => {
          const img = new Image()
          img.src = sizeSrc
          // Add loading priority for mobile sizes
          if (sizeSrc.includes('w_480') || sizeSrc.includes('w_768')) {
            img.loading = 'eager'
          }
        })
      })
    }

    // Preload images after a short delay to not block initial render
    const timer = setTimeout(preloadImages, 500) // Reduced delay for faster mobile loading
    return () => clearTimeout(timer)
  }, [images])

  return null
}

