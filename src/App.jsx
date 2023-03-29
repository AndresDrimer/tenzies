import { useState, useEffect } from "react";
import Die from "./components/Die";
import "./App.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import argentina from "/argentina.svg";
import usa from "/usa.svg";
import Counter from "./components/Counter";
import dice from "/dice.svg";
import { Route, Routes, Link } from "react-router-dom";
import Scores from "./components/Scores";


function App() {
  const [randomNumsArray, setRandomNumsArray] = useState(populateNumArray());
  const [tenzies, setTenzies] = useState(false);
  const [timesPlayed, setTimesPlayed] = useState(0);
  const [counter, setCounter] = useState(0);
  const [spanish, setSpanish] = useState(true);

  const [registered, SetRegistered] = useState(true);
  const [actualScore, setActualScore] = useState(
      {name: "", 
      score: null, id: nanoid()}
  );
  const [allScores, setAllScores] = useState([
    {  
      name: "pedro",
      score: 295,
      id: nanoid(),
     }
    ])

 

  useEffect(() => {
    const allSelected = randomNumsArray.every((it) => it.isSelected);
    const sameValue = randomNumsArray.every(
      (it) => it.number === randomNumsArray[0].number
    );
    if (allSelected && sameValue) {
      setTenzies(true);
    }
  }, [randomNumsArray]);

  //timer//
  useEffect(() => {
    const timer = !tenzies && setTimeout(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

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
      setTenzies(false); // winning the game
      setRandomNumsArray(populateNumArray());
      setTimesPlayed(0);
      setDataForm((prev) =>
        prev.map((it) => {
          return {
            ...prev,
          };
        })
      );
    }
  }

  function toggleIdiom() {
    setSpanish((prev) => !prev);
  }

  const roll = spanish ? "Tirar de nuevo" : "Roll again";

  const btnStyle = {
    backgroundColor: tenzies ? "#222222" : "rgb(136, 189, 216)",
    color: tenzies ? "azure" : "#222222",
  };

  function seconds(n) {
    return (n < 10 ? "0" : "") + n;
  }
  const newGame = spanish ? "* Nueva Partida *" : "* New Game *";

  const score = 1000 - (timesPlayed * 20 + counter);

  function reloadANewGame() {
    setCounter(0);
    setTenzies(false);
    setTimesPlayed(0);
    setRandomNumsArray(populateNumArray());
  }

  function handleButtonRegister(e) {
    e.preventDefault();
    console.log("handlebuttonRegister");
    SetRegistered(true);
    /* .then(res => SetRegistered(true))
    .catch( err => alert.log("tuvimos este problema : " + error  " Que bajon total!"))*/
  }

  function handleChangeOnInput(event) {
    const { name, value } = event.target;
    setActualScore((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(actualScore);
  }

  useEffect(() => {
    setActualScore((prev) => {
      return {
        ...prev,
        score: score,
      };
    });
  }, [tenzies]);

 

  /*variables de la fecha*/
  const idiomSelect = spanish ? "es-ES" : "en-us";

  let Today = new Date().toLocaleDateString(idiomSelect, { weekday: "long" });
  let day = new Date().toLocaleDateString(idiomSelect, { day: "numeric" });
  let month = new Date().toLocaleDateString(idiomSelect, { month: "long" });

  return (
    <div className="App">
      <div className="game-wrapper">
        {tenzies && <Confetti />}

        <div className="date-idioms-container">
          <h4 className="date">
            {`${Today},`} <span>{`${day} ${month}`}</span>
          </h4>

          <div className="btns-idiom-selectors">
            <img
              src={spanish ? argentina : usa}
              alt="argentinian flag"
              onClick={toggleIdiom}
              className="flag"
            />
          </div>
        </div>

        <h1 className="title">TENZIES🎲 </h1>
        <img src={dice} className="-title-img-dice" />



        
        <h3 className="subTitle">
          {spanish
            ? "Elegí el número que quieras y marcá todos los que encuentres. Luego tocá el botón ´Tirar de nuevo´ hasta completar todos los casilleros con el mismo número. Apurate, tu tiempo corre!"
            : "Choose a number and tape on every single one. Update your numbers with the ´Roll Again´ button. Hurry up, time´s running! "}
        </h3>

        <div className="total-numbers-wrapper">{buttonNumbersElements}</div>

        {!tenzies ? (
          <button
            className="dar-de-nuevo-btn"
            onClick={darDeVuelta}
            style={btnStyle}
          >
            {tenzies ? newGame : roll}
          </button>
        ) : (
          <button className="btn-play-again" onClick={reloadANewGame}>
            {spanish ? "* Jugar de nuevo *" : "* New Game *"}
          </button>
        )}

        <hr />

        <Counter
          spanish={spanish}
          seconds={seconds}
          counter={counter}
          timesPlayed={timesPlayed}
          score={score}
        />

      
      </div>
    </div>
  );
}

export default App;
