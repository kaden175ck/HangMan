import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
 


function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => getWord()) 

  // console.log(wordToGuess)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = inCorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  },[guessedLetters, isWinner, isLoser])



  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
        const key = e.key
        if(!key.match(/^[a-z]$/)) return

        e.preventDefault()
        addGuessedLetter(key)
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  },[guessedLetters])
  //👈 这里 useEffect 里用到了 addGuessedLetter，但依赖数组里没写它，所以 ESLint 说“你可能会拿到旧的 addGuessedLetter 闭包，有个警告，这个项目不影响








  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
        const key = e.key
        if(key !== "Enter") return

        e.preventDefault()
        setGuessedLetters([])

        setWordToGuess(getWord())
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  },[])
  // 这个 effect 只在 mount 和 unmount 时运行一次，所以依赖数组是空的,最终目的是按回车键重置游戏



  return (
    <div style={{ 
      maxWidth: 800, 
      display: "flex", 
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
    }}>

        <div style={{ fontSize: "2rem", textAlign: "center" }}>
          {isWinner && "You Win! - Refresh to try again"}
          {isLoser && "You Lose! - Refresh to try again"}
        </div>

        <HangmanDrawing numberOfGuesses={inCorrectLetters.length}/>
        <HangmanWord reveal={isLoser} guessedLetters = {guessedLetters} wordToGuess={wordToGuess}/>

        {/* we set it to flex above so we have to use a div here to rest it to stretch*/}
        <div style={{ alignSelf: "stretch" }}>
          <Keyboard 
            disabled={isWinner || isLoser}
            activeLetters ={guessedLetters.filter(letter=> wordToGuess.includes(letter))}
            inactiveLetters={inCorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />
        </div>

    </div>
  )
}

export default App
