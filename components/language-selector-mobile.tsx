"use client"

import { useState } from "react"
import { useLanguage, type Language } from "@/contexts/language-context"

interface LanguageOption {
  code: Language
  name: string
  nativeName: string
  shortName: string
}

const languageOptions: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", shortName: "EN" },
  { code: "ar", name: "Arabic", nativeName: "عربي", shortName: "عر" },
  { code: "he", name: "Hebrew", nativeName: "עברית", shortName: "עב" },
]

export function LanguageSelectorMobile() {
  const { language, setLanguage, isLoaded } = useLanguage()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLanguageChange = async (newLanguage: Language) => {
    if (newLanguage === language || isAnimating) return

    setIsAnimating(true)
    setTimeout(() => {
      setLanguage(newLanguage)
      setTimeout(() => setIsAnimating(false), 300)
    }, 150)
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-12 h-8 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
      {languageOptions.map((lang) => {
        const isSelected = language === lang.code

        return (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isAnimating}
            className={`
              relative px-3 py-2 text-xs font-bold rounded-lg
              transition-all duration-300 ease-out transform-gpu
              ${
                isSelected
                  ? `
                    text-white bg-gradient-to-r from-blue-500/40 to-purple-500/40
                    shadow-lg scale-110 border border-white/50
                    animate-glow
                  `
                  : `
                    text-white/70 hover:text-white hover:bg-white/10 hover:scale-105
                    border border-transparent hover:border-white/30
                  `
              }
              active:scale-95 focus:outline-none
              sm:px-4 sm:py-2.5 sm:text-sm
            `}
            aria-label={`Switch to ${lang.name}`}
          >
            {/* Mobile: Show short name, Desktop: Show full native name */}
            <span className="block sm:hidden">{lang.shortName}</span>
            <span className="hidden sm:block">{lang.nativeName}</span>

            {/* Active indicator */}
            {isSelected && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
            )}
          </button>
        )
      })}

      {/* Loading overlay */}
      {isAnimating && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
