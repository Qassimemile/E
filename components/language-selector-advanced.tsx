"use client"

import { useState } from "react"
import { useLanguage, type Language } from "@/contexts/language-context"

interface LanguageOption {
  code: Language
  name: string
  nativeName: string
  flag: string
}

const languageOptions: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ar", name: "Arabic", nativeName: "عربي", flag: "🇸🇦" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱" },
]

export function LanguageSelectorAdvanced() {
  const { language, setLanguage, isRTL, isLoaded } = useLanguage()
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredLang, setHoveredLang] = useState<Language | null>(null)

  const handleLanguageChange = async (newLanguage: Language) => {
    if (newLanguage === language || isAnimating) return

    setIsAnimating(true)

    // Create a ripple effect
    const button = document.querySelector(`[data-lang="${newLanguage}"]`)
    if (button) {
      button.classList.add("animate-ripple")
      setTimeout(() => button.classList.remove("animate-ripple"), 600)
    }

    setTimeout(() => {
      setLanguage(newLanguage)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  // Show loading state during hydration
  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-20 h-10 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="relative group">
      {/* Container with glassmorphism */}
      <div className="flex items-center gap-1 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        {languageOptions.map((lang, index) => {
          const isSelected = language === lang.code
          const isHovered = hoveredLang === lang.code

          return (
            <button
              key={lang.code}
              data-lang={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              onMouseEnter={() => setHoveredLang(lang.code)}
              onMouseLeave={() => setHoveredLang(null)}
              disabled={isAnimating}
              className={`
                relative px-4 py-2.5 text-sm font-semibold rounded-xl
                transition-all duration-500 ease-out transform-gpu will-change-transform
                overflow-hidden group/button
                ${
                  isSelected
                    ? `
                      text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30
                      shadow-lg shadow-blue-500/25 scale-110 border border-white/40
                      animate-glow
                    `
                    : `
                      text-white/80 hover:text-white hover:bg-white/10 hover:scale-105
                      border border-transparent hover:border-white/30
                      hover:shadow-lg hover:shadow-white/10
                    `
                }
                ${isAnimating && isSelected ? "animate-pulse-slow" : ""}
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400/50
                disabled:cursor-not-allowed disabled:opacity-75
              `}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              aria-label={`Switch to ${lang.name}`}
              aria-pressed={isSelected}
            >
              {/* Animated background */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20
                  transition-all duration-500 rounded-xl
                  ${isSelected ? "opacity-100 animate-gradient-shift" : "opacity-0 group-hover/button:opacity-60"}
                `}
              />

              {/* Shimmer effect */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transform -skew-x-12 transition-transform duration-1000 rounded-xl
                  ${isSelected ? "translate-x-full animate-shimmer" : "-translate-x-full"}
                `}
              />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                <span className="whitespace-nowrap font-medium">{lang.nativeName}</span>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg animate-bounce" />
              )}

              {/* Hover glow effect */}
              {(isHovered || isSelected) && (
                <div className="absolute inset-0 rounded-xl bg-white/5 animate-pulse-gentle" />
              )}
            </button>
          )
        })}
      </div>

      {/* Loading overlay */}
      {isAnimating && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
          <div className="flex items-center gap-2 text-white">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-sm font-medium">Switching...</span>
          </div>
        </div>
      )}
    </div>
  )
}
