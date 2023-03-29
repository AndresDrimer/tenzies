import { useState } from "react";

export default function Scores(props) {
  const [showResults, setShowResults] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setShowResults((prev) => !prev);

    props.allScores.push(props.actualScore);
    console.log(props.allScores);
  }

  const makeScoresList = () => {
    
  };

  

  console.log(props.actualScore);
  return (
    <>
      <div>
        {" "}
        {props.spanish ? (
          <>
            <h3>Entraste al Top5 de Tenzies.</h3> <h2>¡Felicitaciones!</h2>
          </>
        ) : (
          <>
            <h3>You´ve entered Tenzies Top5 scores.</h3>
            <h2>Well done!!</h2>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          ✨{props.spanish ? " Ingresa tu nombre  " : " Enter your name  "}
          <input
            type="text"
            name="name"
            value={props.actualScore.name}
            onChange={props.handleChangeOnInput}
          />
        </label>
        <button className="--scores-form-btn">send</button>
      </form>

      <br />
      {showResults && (
        <>
          <h3>
            {props.spanish ? "Tu nombre: " : "Your name: "}{" "}
            {props.actualScore.name}
          </h3>
          <h3>
            {props.spanish ? "Tu puntaje: " : "Your score: "}{" "}
            {props.actualScore.score} 🏆
          </h3>
        </>
      )}

      {makeScoresList}
    </>
  );
}
