"use client"
import React, { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { calculateYearPoints } from "lib/game"
import type { Animal } from "@prisma/client"

type GameClientComponentProps = {
  animalsCount: number
  animals: Animal[]
}

export default function GameClientComponent({ animalsCount, animals }: GameClientComponentProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [guessStatus, setGuessStatus] = useState("")
  const [guessYear, setGuessYear] = useState("")
  const [guessDiet, setGuessDiet] = useState("")
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")

  const clearGuesses = () => {
    setGuessStatus("")
    setGuessYear("")
    setGuessDiet("")
  }

  const handleStartGame = useCallback(() => {
    setGameStarted(true)
    setGameOver(false)
    setCurrentIndex(0)
    setScore(0)
    setFeedback("")
    clearGuesses()
  }, [])

  const handleSubmitGuess = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      const currentAnimal = animals[currentIndex]
      if (!currentAnimal) return

      if (!guessStatus) {
        setFeedback("Please select an extinction status.")
        return
      }
      if (!guessDiet) {
        setFeedback("Please select a diet option.")
        return
      }

      const guessedYear = parseInt(guessYear, 10)
      if (isNaN(guessedYear)) {
        setFeedback("Please enter a valid year.")
        return
      }

      const basePoints = calculateYearPoints(currentAnimal.extinctionYear, guessedYear)

      let statusBonus = 0
      if (guessStatus === currentAnimal.extinctionStatus) {
        statusBonus = 20
      }
      let dietBonus = 0
      if (guessDiet === currentAnimal.dietType) {
        dietBonus = 20
      }

      const totalPoints = basePoints + statusBonus + dietBonus

      setScore((prevScore) => prevScore + totalPoints)
      setFeedback(
        `Animal: ${currentAnimal.name}  
Actual extinction year: ${currentAnimal.extinctionYear}  
Your year guess earned: ${basePoints} points.  
${guessStatus === currentAnimal.extinctionStatus ? "Status bonus: " + statusBonus + " points." : ""}  
${guessDiet === currentAnimal.dietType ? "Diet bonus: " + dietBonus + " points." : ""}  
Total points: ${totalPoints}.`,
      )

      clearGuesses()

      if (currentIndex < animals.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1)
      } else {
        setFeedback((prev) => prev + " Game over!")
        setGameOver(true)
      }
    },
    [animals, currentIndex, guessStatus, guessYear, guessDiet],
  )

  if (!gameStarted) {
    return (
      <>
        <h1 className="text-2xl text-center font-semibold">Welcome to the Guessing Game!</h1>
        <h2 className="text-center text-slate-500 mb-10 text-xs">This page uses client-side JavaScript for demo purposes!</h2>

        {/* Rules */}
        <div className="container bg-slate-800 mx-auto p-5 rounded-xl max-w-xl">
          <h3 className="text-center text-gray-300 text-xl font-bold">Rules:</h3>
          <ol className="text-gray-300 list-decimal list-inside">
            <li>You will be shown images of animals, as well as their names.</li>
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
            className="cursor-pointer font-bold text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >Start Game
          </button>
        </div>
      </>
    )
  }

  if (gameOver) {
    return (
      <>
        <h1 className="text-2xl text-center font-semibold">Guessing Game Complete!</h1>
        <h2 className="text-center text-slate-500 mb-10 text-xs">Great Job!</h2>

        <p className="text-center mb-10 font-bold">Your Score: {score}</p>
        <p className="text-center">{feedback}</p>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleStartGame}
            className="cursor-pointer font-bold text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >Play Again
          </button>
        </div>
      </>
    )
  }

  const currentAnimal = animals[currentIndex]
  return (
    <div>
      <h1 className="text-2xl text-center mb-10 font-semibold">Playing the Guessing Game!</h1>

      {/* Game */}
      <div className="container mx-auto bg-slate-800 flex flex-col rounded-xl p-5">
        <span className="text-sm text-center">Guess {currentIndex + 1} of {animals.length}</span>
        <h1 className="text-2xl text-center font-semibold">{currentAnimal.name}</h1>
        <Image
          src={`/animals/${currentAnimal.image}`}
          alt={currentAnimal.name}
          width={400}
          height={400}
          className="mx-auto"
        />

        {/* Form */}
        <form onSubmit={handleSubmitGuess}>
          {/* Extinction Status */}
          <div className="w-68 mx-auto mt-4">
            <label htmlFor="status" className="block mb-2 text-sm text-white">
              Extinction Status
            </label>
            <select
              id="status"
              value={guessStatus}
              onChange={(e) => setGuessStatus(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select status</option>
              <option value="Extinct">Extinct</option>
              <option value="NotExtinct">Not Extinct</option>
              <option value="Deextincting">Deextincting</option>
            </select>
          </div>

          {/* Extinction Year */}
          <div className="w-68 mx-auto mt-4">
            <label
              htmlFor="extinction_year"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Extinction Year
            </label>
            <input
              type="number"
              id="extinction_year"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              max={new Date().getFullYear()}
              value={guessYear}
              onChange={(e) => setGuessYear(e.target.value)}
              required
            />
            <span className="text-xs text-gray-400">
               Enter year number, negative for BCE.
             </span>
          </div>

          {/* Diet */}
          <div className="w-68 mx-auto mt-4">
            <label htmlFor="diet" className="block mb-2 text-sm text-white">
              Diet
            </label>
            <select
              id="diet"
              value={guessDiet}
              onChange={(e) => setGuessDiet(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select diet</option>
              <option value="Carnivore">Carnivore</option>
              <option value="Herbivore">Herbivore</option>
              <option value="Omnivore">Omnivore</option>
            </select>
          </div>

          {/* Next button */}
          <div className="flex justify-center p-10">
            <button
              type="submit"
              className="cursor-pointer text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg px-5 py-2.5 text-center me-2 mb-2"
            >Next Guess
            </button>
          </div>
        </form>

        <p className="text-center">{feedback}</p>
        <p className="text-center">Current Score: {score}</p>
      </div>

    </div>
  )
}
