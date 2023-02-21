export default function Counter(props) {
  return (
    <div className="--counter-wrapper">
      <h5>
        {props.spanish ? "Tiempo: " : "Timer: "}
        {props.seconds(props.counter)}
      </h5>
    </div>
  );
}
