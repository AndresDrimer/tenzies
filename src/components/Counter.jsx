export default function Counter(props) {
  return (
    <div className="--counter-wrapper-total">
      <div className="--counter-wrapper-first-line"> 
        {props.timesPlayed > 0 && (
          <h4>{props.spanish ? "Cantidad de tiradas" : "Number of rows"}:{" "}
            {props.timesPlayed}
          </h4>)}
        <div className="--counter-wrapper">
          <h4>
            {props.spanish ? "Tiempo: " : "Timer: "}
            {props.seconds(props.counter)}
          </h4>
        </div>
      </div>
        <div className="--counter-total-points">
          <h3>{props.spanish ? "PUNTAJE " : "SCORE "} : {props.score} </h3>
        </div>
      
    </div>
  );
}
