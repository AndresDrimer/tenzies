import { useState } from "react";
import Die from "./components/Die";
import "./App.css";
import {nanoid} from 'nanoid'

function App() {


  function getNumber() {
    const numberArray = [];
    for (let i = 0; i < 10; i++) {
      numberArray.push({
        number: Math.floor(Math.random() * 6) + 1,
        isSelected: false,
        id: nanoid()
      });
    }
    return numberArray;
  }

  const [numbers, setNumbers] = useState(getNumber());

  function holdDice(id) {
    setNumbers(prev => prev.map( it => {
      return it.id===id ? 
      {...it, 
        isSelected: !isSelected} : it
    }))
  }

  const elements = numbers.map((it) => {
    return <Die 
              number={it.number} 
              isSelected={it.isSelected} 
              holdDice={()=> holdDice(it.id)} 
              key={it.id}
              value={it.value}
              />;
  });

  function nuevosNumeros() {
    setNumbers(getNumber());
  }

  return (
    <div className="App">
      <main>
        <div className="die-wrapper">
        {elements}
        </div>
        <button
          className="btn-nuevosNumeros"
          type="submit"
          onClick={nuevosNumeros}
        >
          Actualizar
        </button>
      </main>
    </div>
  );
}

export default App;
