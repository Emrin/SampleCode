"use-client"
import { createTranslator, getCookieLang } from "@/i18n"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

export async function generateMetadata() {
  const locale = await getCookieLang()
  const t = await createTranslator(locale, "Game")

  return {
    title: t("title")
  }
}


export default async function Game() {
  const cookieStore = await cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)
  if (!session.isLoggedIn) redirect("/login")
  const locale = await getCookieLang()
  const t = await createTranslator(locale, "Game")

  return (
    <div>
      <h3 className="text-2xl text-center mt-10 font-semibold">Welcome to the guessing game!</h3>
      <h3 className="text-center text-slate-500">This page uses client-side JavaScript for demo purposes!</h3>

      <h3 className="text-center py-10">#TODO</h3>

    </div>
  );
}
