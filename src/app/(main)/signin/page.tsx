import { createTranslator, getCookieLang } from "@/i18n"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

export async function generateMetadata() {
  const locale = await getCookieLang()
  const t = await createTranslator(locale, "Signin")

  return {
    title: t("title")
  }
}

export default async function Signin() {
  const cookieStore = await cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)
  if (session.isLoggedIn) redirect("/")
  const locale = await getCookieLang()
  const t = await createTranslator(locale, "Signin")

  return (
    <div>
      <h3 className="text-2xl text-center my-10 font-semibold">{t("header")}</h3>
      <form
        action="/api/signin"
        method="post"
        className="max-w-sm mx-auto"
      >
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9_]*"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={8}
            maxLength={256}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Sign In
        </button>
      </form>
    </div>
  );
}
