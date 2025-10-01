type HangmanWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
}


export function HangmanWord({ guessedLetters, wordToGuess, reveal=false }: HangmanWordProps) {

  return <div style={{ fontSize: "6rem", display: "flex", gap: ".25em", fontWeight: "bold", textTransform: "uppercase", fontFamily: "monospace" }}>
    {wordToGuess.split("").map((letter, index) => (
      <span key={index} style={{ borderBottom: ".1em solid black" }}>
        <span style={{ visibility: guessedLetters.includes(letter) || reveal 
          ? "visible" 
          : "hidden",
          color: !guessedLetters.includes(letter) && reveal ? "red" : "black"}}>
          {letter}
        </span>
      </span>
    ))}
  </div>
}