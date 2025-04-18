import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { cookies } from "next/headers"
import React from "react"
import { createTranslator, getCookieLang } from "@/i18n"

export default async function Home() {
  const cookieStore = await cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)
  const locale = await getCookieLang()
  const t = await createTranslator(locale, "Home")
  return (
    <div className="flex flex-col flex-grow container mx-auto p-4">

      <h2 className="text-2xl font-semibold mb-4">{t("welcome")} {session?.isLoggedIn ? session.username : "Anon"}!</h2>

      {session.isLoggedIn
       ? <div>
         <p className="text-slate-300 pb-10">
           {t("visit")} <a href="/game" className="text-blue-400 hover:underline">{t("game")}</a> {t("play")}
         </p>
         <div className="flex justify-center">
           <a
             href="/game"
             className="text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-800 rounded-lg px-10 py-5 text-center me-2 mb-2"
           >Play NOW!!
           </a>
         </div>
       </div>
       : <div>
         <p className="text-slate-300">
           <a
             href="/signin" className="text-blue-400 hover:underline"
           >{t("login")}</a> {t("or")} <a
           href="/signup" className="text-blue-400 hover:underline"
         >{t("signup")}</a> {t("play")}
         </p>
       </div>
      }

    </div>
  )
}
