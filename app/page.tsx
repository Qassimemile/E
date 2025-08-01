import { Portfolio } from "@/components/portfolio"
import { LanguageProvider } from "@/contexts/language-context"

export default function Home() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  )
}
