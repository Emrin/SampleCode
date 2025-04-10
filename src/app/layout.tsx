import type { Metadata } from "next"
import "styles/globals.css"


export const metadata: Metadata = {
  title: "Sample App",
  description: "Sample Description",
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
