import { useState, useEffect } from "react";
import Die from "./components/Die";
import "./App.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";


function App() {
  const [randomNumsArray, setRandomNumsArray] = useState(populateNumArray());

  const [tenzies, setTenzies] = useState(false);

  const [timesPlayed, setTimesPlayed] = useState(0);

  const [time, setTime] = useState(0);

  

  useEffect(() => {
    const allSelected = randomNumsArray.every((it) => it.isSelected);
    const sameValue = randomNumsArray.every(
      (it) => it.number === randomNumsArray[0].number
    );
    if (allSelected && sameValue) {
      setTenzies(true);
    }
  }, [randomNumsArray]);

  function generateNewArray() {
    return {
      number: Math.floor(Math.random() * 6) + 1,
      isSelected: false,
      id: nanoid(),
    };
  }

  function populateNumArray() {
    const numberArray = [];
    for (let i = 0; i < 10; i++) {
      numberArray.push(generateNewArray());
    }
    return numberArray;
  }
  function buttonClicked(id) {
    setRandomNumsArray((prev) =>
      prev.map((it) => {
        return it.id === id ? { ...it, isSelected: !it.isSelected } : it;
      })
    );
  }

  const buttonNumbersElements = randomNumsArray.map((item) => {
    return (
      <Die
        number={item.number}
        key={item.id}
        buttonClicked={() => buttonClicked(item.id)}
        isSelected={item.isSelected}
      />
    );
  });

  function darDeVuelta() {
    if (!tenzies) {
      setRandomNumsArray((prev) =>
        prev.map((it) => {
          return it.isSelected ? it : generateNewArray();
        })
      );
      setTimesPlayed((prev) => prev + 1);
    } else {
      setTenzies(false);
      setRandomNumsArray(populateNumArray());
      setTimesPlayed(0);
    }
  }

  return (
    <div className="App">
  
      <div className="game-wrapper">
        {tenzies && <Confetti />}

        <h1>Tenzies</h1>
        <h3 className="sub-titulo">
          Elegí el número que quieras y marcá todos los que encuentres. Luego
          tocá "Dar de nuevo" hasta completar todos los casilleros con el mismo
          número.
        </h3>
        <div className="total-numbers-wrapper">{buttonNumbersElements}</div>
        <button className="dar-de-nuevo-btn" onClick={darDeVuelta}>
          {tenzies ? "* Nueva partida *" : "Dar de nuevo"}
        </button>
        <hr />
        {timesPlayed > 0 && <h4>Cantidad de tiradas: {timesPlayed}</h4>}
        <h5>{time}</h5>
      </div>
    </div>
  );
}

export default App;
