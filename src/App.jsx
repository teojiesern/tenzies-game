import React from "react"
import Die from "./Die"

export default function App(){
  const [die, setDie] = React.useState([])
  const [tenzies, setTenzies] = React.useState(false)

  function rollAll(){
    const tempDie = []
    for(let i=0; i<10; i++){
      tempDie.push({
        id: i+1,
        value: generateRandom(),
        locked: false
      })
    }
    setDie(tempDie)
    console.log(dices)
  }

  function generateRandom(){
    return Math.ceil(Math.random()*9)
  }

  function lockDie(id){
    let tempDie = []
    setDie(prevDie => {
      for(let i=0; i<10; i++){
        if(prevDie[i].id === id){
          tempDie.push({
            ...prevDie[i],
            locked: !prevDie[i].locked
          })
        }else{
          tempDie.push(prevDie[i])
        }
      }
      console.log(tempDie)
      return tempDie
    })
  }

  const dices = die.map(dice => {
    return (
      <div key={dice.id} className={dice.locked ? "individual-die locked" : "individual-die"} onClick={() => lockDie(dice.id)}>
        {dice.value}
      </div>
    )
  })

  return (
    <div className="app-container">
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">{dices}</div>
      <button onClick={rollAll}>{tenzies ? "Start Again" : "Roll"}</button>
    </div>
  )
}