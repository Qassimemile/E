"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "./modal"
import { useLanguage } from "@/contexts/language-context"
import { Phone, Mail, Globe, Send } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" })
    // Show success message or close modal
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("contact")}>
      <div className="space-y-6">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
            <Phone className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white/70 text-sm">{t("phone")}</div>
              <div className="text-white font-medium">054-2861919</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
            <Mail className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-white/70 text-sm">{t("email")}</div>
              <div className="text-white font-medium">amil_lee@hotmail.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
            <Globe className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-white/70 text-sm">{t("website")}</div>
              <div className="text-white font-medium">emile-portfolio.com</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">{t("name")}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">{t("email")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">{t("phone")}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">{t("message")}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {t("send")}
          </button>
        </form>
      </div>
    </Modal>
  )
}
