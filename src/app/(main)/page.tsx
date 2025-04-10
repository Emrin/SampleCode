import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { cookies } from "next/headers"
import React from "react"

export default async function Home() {
  const cookieStore = await cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)

  return (
    <div className="flex flex-col flex-grow container mx-auto p-4">

        <h2 className="text-2xl font-semibold mb-4">Welcome, {session?.isLoggedIn ? session.username : "Anon"}!</h2>
        <p className="text-slate-300">
          This is the home page.
        </p>

    </div>
  );
}
