"use client"

import { useState } from "react"
import { useLanguage, type Language } from "@/contexts/language-context"

interface LanguageOption {
  code: Language
  name: string
  nativeName: string
}

const languageOptions: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ar", name: "Arabic", nativeName: "عربي" },
  { code: "he", name: "Hebrew", nativeName: "עברית" },
]

export function LanguageSelector() {
  const { language, setLanguage, isRTL, isLoaded } = useLanguage()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLanguageChange = async (newLanguage: Language) => {
    if (newLanguage === language || isAnimating) return

    setIsAnimating(true)

    // Add a subtle delay for smooth transition
    setTimeout(() => {
      setLanguage(newLanguage)
      setTimeout(() => setIsAnimating(false), 300)
    }, 150)
  }

  // Show loading state during hydration
  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-16 h-8 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Language Buttons */}
      <div className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
        {languageOptions.map((lang) => {
          const isSelected = language === lang.code
          const isCurrentlyAnimating = isAnimating && isSelected

          return (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={isAnimating}
              className={`
                relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-out
                transform-gpu will-change-transform
                ${
                  isSelected
                    ? `
                      text-white bg-white/20 shadow-lg scale-105
                      border border-white/30
                      shadow-blue-500/20
                      before:absolute before:inset-0 before:rounded-lg 
                      before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20
                      before:opacity-100 before:transition-opacity before:duration-300
                    `
                    : `
                      text-white/70 hover:text-white hover:bg-white/10 hover:scale-102
                      border border-transparent hover:border-white/20
                      before:absolute before:inset-0 before:rounded-lg 
                      before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20
                      before:opacity-0 hover:before:opacity-50 before:transition-opacity before:duration-300
                    `
                }
                ${isCurrentlyAnimating ? "animate-pulse" : ""}
                active:scale-95
                focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent
              `}
              aria-label={`Switch to ${lang.name}`}
              aria-pressed={isSelected}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Text content */}
              <span className="relative z-10 whitespace-nowrap">{lang.nativeName}</span>

              {/* Active indicator glow */}
              {isSelected && <div className="absolute inset-0 rounded-lg bg-white/10 animate-pulse" />}

              {/* Selection indicator dot */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-ping" />
              )}
            </button>
          )
        })}
      </div>

      {/* Loading overlay during language switch */}
      {isAnimating && (
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Mobile-friendly tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Select Language
      </div>
    </div>
  )
}
