import React, { ReactNode } from "react"
import Header from "components/Header"
import Footer from "components/Footer"

type Props = {
  children: ReactNode
}

export default async function MainLayout({ children }: Props) {

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
