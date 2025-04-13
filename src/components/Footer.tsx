import { createTranslator, getCookieLang, i18nConfig } from "@/i18n"

export default async function Footer() {
  const currentLocale = await getCookieLang()
  const locales = i18nConfig.locales
  const locale = await getCookieLang()
  const t = await createTranslator(locale, "Footer")
  return (
  <footer className="rounded-lg shadow-sm bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{t("title")}</span>
        </a>
        {/* Locales */}
        <div className="relative inline-block group">
          <button className="px-4 py-2 bg-gray-800 rounded cursor-pointer">
            {t(currentLocale)}
          </button>
          {/* Dropdown menu */}
          <ul className="absolute right-0 bottom-full w-32 bg-gray-800 text-gray-400 rounded shadow-lg hidden group-hover:block">
            {locales.map((locale) => (
              locale !== currentLocale && <li key={locale} className="block">
                <form action="/api/i18n" method="post">
                  <input name="locale" type="hidden" defaultValue={locale} />
                  <button
                    type="submit"
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 hover:text-white cursor-pointer"
                  >
                    {t(locale)}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
      <span className="block text-sm sm:text-center text-gray-400">
        &copy; {new Date().getFullYear()} <a href="/" className="hover:underline">{t("title")}™</a>. {t("rights")}</span>
    </div>
  </footer>
  )
}
