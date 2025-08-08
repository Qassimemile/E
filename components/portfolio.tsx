"use client"

import { useState, useEffect } from "react"
import { artworks } from "@/data/artworks"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "./language-selector"
import { ImagePreloader } from "./image-preloader"
import { AboutModal } from "./about-modal"
import { PricingModal } from "./pricing-modal"
import { ContactModal } from "./contact-modal"
import { MobileGalleryModal } from "./mobile-gallery-modal"
import { useMobileDetection } from "@/hooks/use-mobile-detection"

export function Portfolio() {
  const { t, isLoaded, language } = useLanguage()
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0)
  const [previousArtworkIndex, setPreviousArtworkIndex] = useState(0)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { isMobile } = useMobileDetection()

  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      if (!isTransitioning) {
        setPreviousArtworkIndex(currentArtworkIndex);
        setIsTransitioning(true);

        setCurrentArtworkIndex((prev) => {
          const newIndex = (prev + 1) % artworks.length;
          return newIndex;
        });

        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isLoaded, currentArtworkIndex, isTransitioning]);

  const currentArtwork = artworks[currentArtworkIndex]
  const previousArtwork = artworks[previousArtworkIndex]

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
      {/* <OrientationNotice /> */}

      <ImagePreloader images={artworks.map((artwork) => artwork.image)} />

      {isTransitioning && (
        <div 
          className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out opacity-0"
          key={`bg-container-prev-${previousArtworkIndex}`}
          style={{
            opacity: isTransitioning ? 1 : 0,
          }}
        >
          <picture className="w-full h-full block">
            <source
              media="(max-width: 480px)"
              srcSet={`${previousArtwork.image.replace("/upload/", "/upload/c_scale,w_480,q_100,f_auto/")}`}
            />
            <source
              media="(max-width: 768px)"
              srcSet={`${previousArtwork.image.replace("/upload/", "/upload/c_scale,w_768,q_100,f_auto/")}`}
            />
            <source
              media="(max-width: 1024px)"
              srcSet={`${previousArtwork.image.replace("/upload/", "/upload/c_scale,w_1024,q_100,f_auto/")}`}
            />
            <source
              media="(max-width: 1200px)"
              srcSet={`${previousArtwork.image.replace("/upload/", "/upload/c_scale,w_1200,q_100,f_auto/")}`}
            />
            <img
              src={`${previousArtwork.image.replace("/upload/", "/upload/c_scale,w_1920,q_100,f_auto/")}`}
              alt={previousArtwork.title}
              className="w-full h-full object-cover object-center"
              loading="eager" 
              sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1200px) 1200px, 1920px"
              style={{
                minHeight: "100vh",
                minHeight: "100dvh",
              }}
            />
          </picture>
          <div className="absolute inset-0 bg-black/20" /> {/* تقليل شفافية الخلفية */}
        </div>
      )}

      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        key={`bg-container-current-${currentArtworkIndex}`}
      >
        <picture className="w-full h-full block">
          <source
            media="(max-width: 480px)"
            srcSet={`${currentArtwork.image.replace("/upload/", "/upload/c_scale,w_480,q_100,f_auto/")}`}
          />
          <source
            media="(max-width: 768px)"
            srcSet={`${currentArtwork.image.replace("/upload/", "/upload/c_scale,w_768,q_100,f_auto/")}`}
          />
          <source
            media="(max-width: 1024px)"
            srcSet={`${currentArtwork.image.replace("/upload/", "/upload/c_scale,w_1024,q_100,f_auto/")}`}
          />
          <source
            media="(max-width: 1200px)"
            srcSet={`${currentArtwork.image.replace("/upload/", "/upload/c_scale,w_1200,q_100,f_auto/")}`}
          />
          <img
            src={`${currentArtwork.image.replace("/upload/", "/upload/c_scale,w_1920,q_100,f_auto/")}`}
            alt={currentArtwork.title}
            className="w-full h-full object-cover object-center"
            loading="eager" 
            sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1200px) 1200px, 1920px"
            style={{
              minHeight: "100vh",
              minHeight: "100dvh",
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-black/20" /> {/* تقليل شفافية الخلفية */}
      </div>
      
      {/* باقي الكود بدون تغيير */}
      {/* ... */}
    </div>
  )
}
