"use-client"
import { createTranslator, getCookieLang } from "@/i18n"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "lib/prisma"
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

  const animalsCount = await prisma.animal.count()



  return (
    <div>
      <h3 className="text-2xl text-center mt-10 font-semibold">Welcome to the guessing game!</h3>
      <h3 className="text-center text-slate-500 mb-10">This page uses client-side JavaScript for demo purposes!</h3>

      <h3 className="text-center text-gray-300 text-xl font-semibold">Rules:</h3>
      <ul className="text-center text-gray-300">
        <li>You will be shown images of extinct animals, as well as their names.</li>
        <li>You must guess as many details as you can about the animals, without looking it up!</li>
        <li>Your score increases the closer you are to the truth!</li>
        <li>After 10 guesses, your final score is displayed in a leaderboard!</li>
      </ul>

      <p className="text-center py-10">There are currently {animalsCount} recorded animals!</p>


      <h3 className="text-center py-10">#TODO</h3>
    </div>
  );
}
