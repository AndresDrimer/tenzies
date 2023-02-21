export default function Die(props) {
  const styles = {
    backgroundColor: props.isSelected ? "green" : "azure",
    color: props.isSelected ? "azure" : "#222222",
  };

  function makePoints(num) {
    let points = [];
    for (let i = 0; i < num; i++) {
      points.push(<span>·</span>);
    }
    return points;
  }

  function assignProperClassName(num) {
    return `--die-die${num}`;
  }

  return (
    <div
      className="--die-each-number-wrapper"
      onClick={props.buttonClicked}
      style={styles}
    >
      <div> {props.number} </div>
    </div>
  );
}
