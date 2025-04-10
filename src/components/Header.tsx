import { getPathname } from "lib/utils"
import { cookies } from "next/headers"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "@/auth"
import { redirect } from "next/navigation"

export default async function Header() {
  const pathname = await getPathname()

  const cookieStore = await cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)

  return (
    <header className="bg-slate-800">
      <nav className="border-gray-200 bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Sample App</span>
          </a>
          <div className="w-full block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
              <li>
                <a
                  href="/"
                  className={
                    `block py-2 px-3 rounded-sm md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent
                  ${pathname === "" && "hover:text-white md:text-blue-500"}
                  `
                  }
                >Home</a>
              </li>
              {!session?.isLoggedIn
               ? <>
                 <li>
                   <a
                     href="/signin"
                     className={
                       `block py-2 px-3 rounded-sm md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent
                  ${pathname === "login" && "hover:text-white md:text-blue-500"}
                  `
                     }
                   >Login</a>
                 </li>
                 <li>
                   <a
                     href="/signup"
                     className={
                       `block py-2 px-3 rounded-sm md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent
                  ${pathname === "signup" && "hover:text-white md:text-blue-500"}
                  `
                     }
                   >Signup</a>
                 </li>
               </> : <li>
                  <form
                    action="/api/signout"
                    method="post"
                    className="hover:text-orange-500"
                  >
                    <button type="submit" className="cursor-pointer">Logout</button>
                  </form>
               </li>}

            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
