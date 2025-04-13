import { ReactNode } from "react"
import "styles/globals.css"
import { createTranslator, getCookieLang } from "@/i18n"

type Props = {
  children: ReactNode
}

export async function generateMetadata() {
  const locale = await getCookieLang()
  const t = await createTranslator(locale, "Layout")

  return {
    title: {
      template: "%s — " + t("title"),
      default: t("title"),
    },
    description: t("description"),
  }
}

export default async function RootLayout({ children }: Props) {
  const lang = await getCookieLang()

  return (
    <html lang={lang}>
    <body className="bg-slate-900 text-slate-100">
    {children}
    </body>
    </html>
  )
}
