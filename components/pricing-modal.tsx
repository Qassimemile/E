"use client"

import { Modal } from "./modal"
import { useLanguage } from "@/contexts/language-context"
import { MessageCircle } from "lucide-react"

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const { t } = useLanguage()

  const whatsappLink = "https://wa.me/972542861919"

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("pricing")}>
      <div className="space-y-8">
       {/* Fantasy Artwork */}
<div className="bg-white/5 rounded-2xl p-6 border border-white/10">
  <h3 className="text-2xl font-bold text-white mb-4">{t("fantasyArtwork")}</h3>

  <div className="space-y-4">
    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
      <span className="text-white">{t("artworkOnly")}</span>
      <span className="text-2xl font-bold text-green-400">₪100</span>
    </div>
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-white">{t("artworkPrint")}</span>
        <span className="text-sm text-white/70">{t("selectSize")}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-white/10 rounded-lg">
          <div className="text-white font-medium">A5</div>
          <div className="text-green-400 font-bold">₪140</div>
        </div>
        <div className="text-center p-3 bg-white/10 rounded-lg">
          <div className="text-white font-medium">A4</div>
          <div className="text-green-400 font-bold">₪170</div>
        </div>
      </div>
    </div>

    {/* الأزرار الجديدة هنا */}
    <div className="flex flex-col md:flex-row gap-3 mt-4">
      {/* زر الواتس */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        {t("contactMe")}
      </a>

      {/* زر الدفع bit */}
      <a
        href="https://www.bitpay.co.il/app/me/1B2826B1-2C20-8E2A-0013-5F5B30A127CE0AFF"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        💳 {t("payNow") || "תשלום"}
      </a>
    </div>
  </div>
</div>


        {/* Logo Design */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">{t("logoDesign")}</h3>
          <div className="flex justify-between items-center mb-4">
            <span className="text-white">{t("startingAt")}</span>
            <span className="text-2xl font-bold text-green-400">₪780</span>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            {t("contactMe")}
          </a>
        </div>

        {/* Book Design */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">{t("bookDesign")}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
              <span className="text-white">{t("coverOnly")}</span>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t("contactMe")}
              </a>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
              <span className="text-white">{t("fullLayout")}</span>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t("contactMe")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
