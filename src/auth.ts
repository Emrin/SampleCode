import "server-only"
import { SessionOptions } from "iron-session"
import { currencyValues } from "lib/data/currencies"

export interface SessionData {
  id: string // To find in DB. Refreshed in login/logout. Virtual or real.
  isLoggedIn: boolean
  userId: string | undefined
  username: string | undefined
  currency: typeof currencyValues[number]
  createdAt: number | undefined
  failPopup: string | undefined
  successPopup: string | undefined
}

export const defaultSession: SessionData = {
  id: "",
  isLoggedIn: false,
  userId: undefined,
  username: undefined,
  currency: "eur",
  createdAt: undefined,
  failPopup: undefined,
  successPopup: undefined,
}

const ttl = 60 * 60 * 3 // 3 hours
export const sessionOptions: SessionOptions = {
  password: {
    1: process.env.PASSWORD_AUTH1!,
    2: process.env.PASSWORD_AUTH2!,
    3: process.env.PASSWORD_AUTH3!,
  },
  cookieName: "session",
  ttl,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "lax",
    maxAge: ttl,
    path: "/",
  },
}
