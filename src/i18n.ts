
import { cookies } from "next/headers"

export const i18nConfig = {
  defaultLocale: "en",
  locales: ["en", "fr"] as const,
} as const

export type Locale = typeof i18nConfig.locales[number]

const dictionaryLoaders: Record<Locale, () => Promise<Record<string, any>>> = {
  en: () => import("./i18n/en").then((mod) => mod.default),
  fr: () => import("./i18n/fr").then((mod) => mod.default),
}

export async function getCookieLang() {
  const cookieStore = await cookies()
  return (cookieStore.get("lang")?.value || "en") as Locale
}

const loadedDictionaries: Partial<Record<Locale, Record<string, string>>> = {}

function isLocale(value: string): value is Locale {
  return (i18nConfig.locales as readonly string[]).includes(value)
}

export function getLocale(locale: string | undefined): Locale {
  if (locale && isLocale(locale)) {
    return locale
  }
  return i18nConfig.defaultLocale
}

export async function getDictionary(locale: Locale) {
  if (loadedDictionaries[locale]) {
    return loadedDictionaries[locale]!
  }

  try {
    const data = await dictionaryLoaders[locale]()
    loadedDictionaries[locale] = data
    return data
  } catch (err) {
    console.error(`Could not load dictionary for locale: ${locale}`, err)
    if (locale !== i18nConfig.defaultLocale) {
      const fallbackData = await dictionaryLoaders[i18nConfig.defaultLocale]()
      loadedDictionaries[i18nConfig.defaultLocale] = fallbackData
      return fallbackData
    }
    throw err
  }
}

export async function createTranslator(locale: Locale, segment: string) {
  const dictionary = await getDictionary(locale)

  return function t(path: string): string {
    const fullPath = `${segment}.${path}`
    const value = getNested(dictionary, fullPath)
    return typeof value === "string" ? value : ""
  }
}

export async function getFullTranslations(locale: string | undefined) {
  const lang = getLocale(locale)
  return getDictionary(lang)
}

function getNested(obj: any, dotPath: string): unknown {
  return dotPath.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object") {
      return acc[key]
    }
    return undefined
  }, obj)
}
