import "styles/globals.css"
import { createTranslator, getCookieLang } from "@/i18n"


export async function generateMetadata() {
  const locale = await getCookieLang()
  const t = await createTranslator(locale, "Layout")

  return {
    title: {
      template: "%s / " + t("title"),
      default: t("title"),
    },
    description: t("description"),
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-slate-900 text-slate-100 min-h-screen"
    >
    <body>
    {children}
    </body>
    </html>
  )
}
