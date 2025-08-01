"use client"

import type React from "react"

import { useEffect } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
          >
            <X className="w-6 h-6 text-white group-hover:text-red-400 transition-colors duration-300" />
          </button>
          {title && <h2 className="text-3xl font-bold text-white mb-6 text-center">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  )
}
