"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"

export type Language = "en" | "ar" | "he"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
  isLoaded: boolean
}

const translations = {
  en: {
    // Navigation
    about: "About",
    pricing: "Pricing",
    contact: "Contact",
    changeLanguage: "Change Language",

    // Hero
    heroTitle: "Emile",
    heroSubtitle: "We draw your imagination in a beautiful artistic style",

    // About
    aboutText:
      "My name is Emile. I love art, imagination, and endless creativity. I use Photoshop, Illustrator, InDesign, Dreamweaver, and AI tools. I'm skilled in JavaScript, HTML, CSS, and Flash. I specialize in fantasy artwork, creative logos, flyers, book design, ads, and more.",

    // Pricing
    fantasyArtwork: "Fantasy Artwork",
    artworkOnly: "Artwork only",
    artworkPrint: "Artwork + Print",
    selectSize: "Select Size",
    logoDesign: "Professional Logo Design",
    startingAt: "Starting at",
    bookDesign: "Book Design",
    coverOnly: "Cover only",
    fullLayout: "Full book layout",
    contactMe: "Contact Me",

    // Contact
    phone: "Phone",
    email: "Email",
    website: "Website",
    name: "Name",
    message: "Message",
    send: "Send",

    // Common
    close: "Close",
    loading: "Loading...",

    // Languages
    english: "English",
    arabic: "عربي",
    hebrew: "עברית",
  },
  ar: {
    // Navigation
    about: "حول",
    pricing: "الأسعار",
    contact: "اتصل",
    changeLanguage: "تغيير اللغة",

    // Hero
    heroTitle: "أميل",
    heroSubtitle: "نرسم خيالك بأسلوب فني جميل",

    // About
    aboutText:
      "اسمي أميل. أحب الفن والخيال والإبداع اللامتناهي. أستخدم فوتوشوب، إليستريتور، إنديزاين، دريم ويفر، وأدوات الذكاء الاصطناعي. أجيد JavaScript وHTML وCSS والفلاش. أبدع في تصميم صور خيالية، شعارات، فلايرات، كتب وإعلانات.",

    // Pricing
    fantasyArtwork: "الأعمال الفنية الخيالية",
    artworkOnly: "العمل الفني فقط",
    artworkPrint: "العمل الفني + الطباعة",
    selectSize: "اختر الحجم",
    logoDesign: "تصميم شعار احترافي",
    startingAt: "يبدأ من",
    bookDesign: "تصميم الكتب",
    coverOnly: "الغلاف فقط",
    fullLayout: "تخطيط الكتاب كاملاً",
    contactMe: "اتصل بي",

    // Contact
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    website: "الموقع",
    name: "الاسم",
    message: "الرسالة",
    send: "إرسال",

    // Common
    close: "إغلاق",
    loading: "جاري التحميل...",

    // Languages
    english: "English",
    arabic: "عربي",
    hebrew: "עברית",
  },
  he: {
    // Navigation
    about: "אודות",
    pricing: "מחירים",
    contact: "צור קשר",
    changeLanguage: "שנה שפה",

    // Hero
    heroTitle: "אמיל",
    heroSubtitle: "אנו מציירים את הדמיון שלך בסגנון אמנותי יפה",

    // About
    aboutText:
      "שמי אמיל. אני אוהב אמנות, דמיון ויצירתיות אינסופית. אני משתמש ב-Photoshop, Illustrator, InDesign, Dreamweaver וכלי בינה מלאכותית. אני שולט ב-JavaScript, HTML, CSS ו-Flash. אני מתמחה ביצירות דמיון, לוגואים, פלאיירים, ספרים ופרסומות.",

    // Pricing
    fantasyArtwork: "יצירות אמנות פנטזיה",
    artworkOnly: "יצירה בלבד",
    artworkPrint: "יצירה + הדפסה",
    selectSize: "בחר גודל",
    logoDesign: "עיצוב לוגו מקצועי",
    startingAt: "החל מ",
    bookDesign: "עיצוב ספרים",
    coverOnly: "כריכה בלבד",
    fullLayout: "פריסת ספר מלאה",
    contactMe: "צור קשר",

    // Contact
    phone: "טלפון",
    email: "אימייל",
    website: "אתר",
    name: "שם",
    message: "הודעה",
    send: "שלח",

    // Common
    close: "סגור",
    loading: "טוען...",

    // Languages
    english: "English",
    arabic: "עربי",
    hebrew: "עברית",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load language from localStorage after hydration
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as Language
    if (savedLanguage && ["en", "ar", "he"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
    setIsLoaded(true)
  }, [])

  // Update localStorage and document attributes when language changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("portfolio-language", language)

      // Update document attributes
      const isRTL = language === "ar" || language === "he"
      document.documentElement.lang = language
      document.documentElement.dir = isRTL ? "rtl" : "ltr"

      // Add language class to body for CSS targeting
      document.body.className = document.body.className.replace(/lang-\w+/g, "")
      document.body.classList.add(`lang-${language}`)
    }
  }, [language, isLoaded])

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage)
  }, [])

  const t = useCallback(
    (key: string): string => {
      const translation = translations[language]?.[key as keyof typeof translations.en]
      return translation || key
    },
    [language],
  )

  const isRTL = useMemo(() => language === "ar" || language === "he", [language])

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      isRTL,
      isLoaded,
    }),
    [language, setLanguage, t, isRTL, isLoaded],
  )

  return (
    <LanguageContext.Provider value={contextValue}>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`transition-all duration-300 ${language === "ar" ? "font-arabic" : language === "he" ? "font-hebrew" : ""}`}
        key={`lang-${language}`} // Force re-render on language change
      >
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
