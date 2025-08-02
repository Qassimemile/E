"use client"

import { useState, useEffect } from "react"
import { RotateCcw, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface OrientationNoticeProps {
  className?: string
  autoHideDelay?: number // Auto-hide after user rotates (in ms)
  showCloseButton?: boolean
}

export function OrientationNotice({
  className = "",
  autoHideDelay = 3000,
  showCloseButton = true,
}: OrientationNoticeProps) {
  const [isPortrait, setIsPortrait] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobileDevice = width <= 768 // Mobile breakpoint
      const isPortraitMode = height > width

      setIsMobile(isMobileDevice)
      setIsPortrait(isPortraitMode)

      // Show notice only on mobile in portrait mode
      const shouldShow = isMobileDevice && isPortraitMode && !isDismissed
      setIsVisible(shouldShow)
    }

    // Initial check
    checkOrientation()

    // Listen for orientation changes
    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(checkOrientation, 100)
    }

    const handleResize = () => {
      checkOrientation()
    }

    // Event listeners
    window.addEventListener("orientationchange", handleOrientationChange)
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange)
      window.removeEventListener("resize", handleResize)
    }
  }, [isDismissed])

  // Auto-hide when rotated to landscape
  useEffect(() => {
    if (!isPortrait && isMobile && isVisible && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, autoHideDelay)

      return () => clearTimeout(timer)
    }
  }, [isPortrait, isMobile, isVisible, autoHideDelay])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  // Don't render if not visible
  if (!isVisible) return null

  return (
    <div
      className={`
      fixed top-0 left-0 right-0 z-50 
      bg-gradient-to-r from-blue-600/95 to-purple-600/95 
      backdrop-blur-sm border-b border-white/20
      text-white shadow-lg
      animate-in slide-in-from-top-2 duration-500
      ${className}
    `}
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-sm mx-auto">
        {/* Icon and Message */}
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-shrink-0">
            <RotateCcw className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="text-sm font-medium leading-tight">
            <p className="text-white/95">{t("rotateForBetter") || "Rotate your device for a better view"}</p>
            <p className="text-white/75 text-xs mt-0.5">{t("landscapeRecommended") || "Landscape mode recommended"}</p>
          </div>
        </div>

        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 ml-2 p-1.5 rounded-full 
                     hover:bg-white/20 active:bg-white/30 
                     transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* Animated Progress Bar */}
      <div className="h-0.5 bg-white/20 overflow-hidden">
        <div className="h-full bg-white/60 animate-pulse" />
      </div>
    </div>
  )
}

// Enhanced version with more customization options
export function OrientationNoticeAdvanced({
  className = "",
  autoHideDelay = 3000,
  showCloseButton = true,
  variant = "gradient", // "gradient" | "solid" | "minimal"
  position = "top", // "top" | "bottom"
}: OrientationNoticeProps & {
  variant?: "gradient" | "solid" | "minimal"
  position?: "top" | "bottom"
}) {
  const [isPortrait, setIsPortrait] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobileDevice = width <= 768
      const isPortraitMode = height > width

      setIsMobile(isMobileDevice)
      setIsPortrait(isPortraitMode)
      setIsVisible(isMobileDevice && isPortraitMode && !isDismissed)
    }

    checkOrientation()

    const handleOrientationChange = () => {
      setTimeout(checkOrientation, 100)
    }

    window.addEventListener("orientationchange", handleOrientationChange)
    window.addEventListener("resize", checkOrientation)

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange)
      window.removeEventListener("resize", checkOrientation)
    }
  }, [isDismissed])

  useEffect(() => {
    if (!isPortrait && isMobile && isVisible && autoHideDelay > 0) {
      const timer = setTimeout(() => setIsVisible(false), autoHideDelay)
      return () => clearTimeout(timer)
    }
  }, [isPortrait, isMobile, isVisible, autoHideDelay])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible) return null

  const variantStyles = {
    gradient: "bg-gradient-to-r from-blue-600/95 to-purple-600/95 backdrop-blur-sm",
    solid: "bg-gray-900/95 backdrop-blur-sm",
    minimal: "bg-black/80 backdrop-blur-sm",
  }

  const positionStyles = {
    top: "top-0 animate-in slide-in-from-top-2",
    bottom: "bottom-0 animate-in slide-in-from-bottom-2",
  }

  return (
    <div
      className={`
      fixed left-0 right-0 z-50 
      ${variantStyles[variant]}
      ${positionStyles[position]}
      text-white shadow-lg duration-500
      ${className}
    `}
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-sm mx-auto">
        <div className="flex items-center gap-3 flex-1">
          <RotateCcw className="w-5 h-5 text-white animate-pulse flex-shrink-0" />
          <div className="text-sm font-medium leading-tight">
            <p className="text-white/95">{t("rotateForBetter") || "Rotate for better view"}</p>
            <p className="text-white/75 text-xs mt-0.5">{t("landscapeRecommended") || "Landscape recommended"}</p>
          </div>
        </div>

        {showCloseButton && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 ml-2 p-1.5 rounded-full 
                     hover:bg-white/20 active:bg-white/30 
                     transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
    </div>
  )
}
