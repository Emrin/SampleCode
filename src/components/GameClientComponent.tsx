"use client"
import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import type { Animal } from "@prisma/client"

type GameClientComponentProps = {
  animalsCount: number
  animals: Animal[]
}

export default function GameClientComponent({ animalsCount, animals }: GameClientComponentProps) {
  const [gameStarted, setGameStarted] = useState(false)

  const handleStartGame = () => {
    setGameStarted(true)
  }

  return (
    <div>

      {!gameStarted
       ? <>
         <h1 className="text-2xl text-center font-semibold">Welcome to the Guessing Game!</h1>
         <h2 className="text-center text-slate-500 mb-10 text-xs">This page uses client-side JavaScript for demo purposes!</h2>

         {/* Rules */}
         <div className="container bg-slate-800 mx-auto p-5 rounded-xl max-w-xl">
           <h3 className="text-center text-gray-300 text-xl font-bold">Rules:</h3>
           <ol className="text-gray-300 list-decimal list-inside">
             <li>You will be shown images of extinct animals, as well as their names.</li>
             <li>You must guess as many details as you can about the animals, without looking it up!</li>
             <li>Your score increases the closer you are to the truth!</li>
             <li>After 10 guesses, your final score is displayed in a leaderboard!</li>
           </ol>
         </div>
         <p className="text-center py-10">There are currently {animalsCount} recorded animals!</p>

         <div className="flex justify-center">
           <button
             type="button"
             onClick={handleStartGame}
             className="cursor-pointer text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
           >Start Game
           </button>
         </div>

       </>
       : <div>
         <h1 className="text-2xl text-center mb-10 font-semibold">Playing the Guessing Game!</h1>

         {/* Game */}
         <div className="container mx-auto bg-slate-800 flex flex-col rounded-xl p-5">
           <h1 className="text-2xl text-center font-semibold">
             {animals[0].name}
           </h1>
           <Image
             src={`/animals/${animals[0].image}`}
             alt="Quiz Image"
             width={400}
             height={400}
             className="mx-auto"
           />

           <div className="w-68 mx-auto mt-4">
             <label
               htmlFor="extinction_year"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               Guess the Extinction Year
             </label>
             <input
               type="number"
               id="extinction_year"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder=""
               required
             />
             <span className="text-xs text-gray-400">
               Enter year number, negative for BCE.
             </span>
           </div>
           #TODO complete
         </div>

       </div>}

    </div>

  )
}
