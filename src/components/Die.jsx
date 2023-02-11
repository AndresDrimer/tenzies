export default function Die(props){
    const styles={
        backgroundColor: props.isSelected ? "green" : "azure",
        color: props.isSelected ? "azure" : "#222222"
    }
    return(
        <div className="--die-each-number-wrapper" onClick={props.buttonClicked} style={styles}>
        <h2>{props.number}</h2>
        </div>
        
    )
}