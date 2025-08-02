"use client"

import { useEffect } from "react"

interface ImagePreloaderProps {
  images: string[]
}

export function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        // Preload high quality images for responsive display
        const sizes = [
          src.replace('/upload/', '/upload/c_scale,w_480,q_90,f_auto/'), // Mobile high quality
          src.replace('/upload/', '/upload/c_scale,w_768,q_90,f_auto/'), // Mobile large high quality
          src.replace('/upload/', '/upload/c_scale,w_1024,q_90,f_auto/'), // Tablet high quality
          src.replace('/upload/', '/upload/c_scale,w_1200,q_90,f_auto/'), // Small desktop high quality
          src.replace('/upload/', '/upload/c_scale,w_1920,q_90,f_auto/')  // Large desktop high quality
        ]
        
        sizes.forEach((sizeSrc, index) => {
          const img = new Image()
          img.src = sizeSrc
          // Prioritize mobile sizes for faster loading
          if (index < 2) {
            img.loading = 'eager'
          }
        })
      })
    }

    // Preload images with optimized timing
    const timer = setTimeout(preloadImages, 300)
    return () => clearTimeout(timer)
  }, [images])

  return null
}

