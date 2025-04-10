import React, { ReactNode } from "react"
import Header from "components/Header"
import Footer from "components/Footer"
import { headers } from "next/headers"

type Props = {
  children: ReactNode
}

export default async function MainLayout({ children }: Props) {
  const headersList = await headers()
  const successPopup = headersList.get("successPopup")
  const failPopup = headersList.get("failPopup")
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      {successPopup
       && <div className="p-4 mb-4 mx-10 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
         <span className="font-medium">Job&apos;s done!</span>
       </div>}
      {failPopup
       && <div className="p-4 mb-4 mx-10 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         <span className="font-medium">{failPopup}</span>
       </div>}

      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
