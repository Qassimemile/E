"use client"

import { Modal } from "./modal"
import { useLanguage } from "@/contexts/language-context"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const { t } = useLanguage()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("about")}>
      <div className="text-white/90 text-lg leading-relaxed">
        <p className="mb-6">{t("aboutText")}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {["Photoshop", "Illustrator", "InDesign", "Dreamweaver", "JavaScript", "HTML", "CSS", "AI Tools"].map(
            (skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {skill}
              </span>
            ),
          )}
        </div>
      </div>
    </Modal>
  )
}
