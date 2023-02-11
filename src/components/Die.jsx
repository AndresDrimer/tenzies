export default function Die(props){
    return(
        <div className={props.isSelected? "--die-box selected" : "--die-box"} onClick={props.holdDice}>
        <h2>{props.number}</h2>
        </div>
        
    )
}