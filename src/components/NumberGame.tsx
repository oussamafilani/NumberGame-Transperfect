import React, { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import "./style.css";

const randNumber = () => Math.floor(Math.random() * 100) + 1;

export default function NumberGame() {
  const [userGuess, setUserGuess] = useState(0);
  const [message, setMessage] = useState("Start guessing...");
  const [isDisabled, setDisabled] = useState(false);
  const [randomNumber, setRandomNumber] = useState<number>(randNumber);
  const ref = useRef<HTMLDivElement>(null);

  console.log("Correct Number : ", randomNumber);

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    if (randomNumber === userGuess) {
      setDisabled(true);
      ref.current?.classList.add("winning-bg");
      setMessage("You win!");
    } else if (randomNumber < userGuess) {
      setMessage("Try again! Your guess was too high.");
    } else {
      setMessage("Try again! Your guess was too low.");
    }
  };

  const restartAgain = () => {
    setDisabled(false);
    setRandomNumber(randNumber);
    setMessage("Start guessing...");
    setUserGuess(0);
    ref.current?.classList.remove("winning-bg");
  };
  return (
    <div className="game" ref={ref}>
      <header>
        <h1>Number Game!</h1>
        <h2>(Between 1 and 100)</h2>
        <hr />
        <p>{message}</p>
      </header>

      <section>
        <form onSubmit={submitHandler}>
          <input
            type="number"
            name="userGuess"
            className="text"
            maxLength={3}
            disabled={isDisabled}
            min={0}
            max={100}
            placeholder="Enter"
            value={userGuess}
            onChange={(e) => {
              setUserGuess(e.target.valueAsNumber);
            }}
          />
          <button type="submit" className="btn">
            Check
          </button>
        </form>
        <button type="button" className="btn" onClick={restartAgain}>
          Again
        </button>
      </section>
    </div>
  );
}
