import { createTranslator, getCookieLang } from "@/i18n"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "lib/prisma"
import React from "react"
import GameClientComponent from "components/GameClientComponent"

const QUIZ_LENGTH = 10

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
  const animals = await prisma.animal.findMany({
    take: QUIZ_LENGTH,
  })

  return (
    <div>
      <GameClientComponent animalsCount={animalsCount} animals={animals} />
    </div>
  );
}
