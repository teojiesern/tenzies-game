import React from "react"
import Confetti from "react-confetti"
import useWindowSize from 'react-use/lib/useWindowSize'
import Timer from "./Timer"

export default function App(){
  const [die, setDie] = React.useState([])
  const [tenzies, setTenzies] = React.useState(false)
  const [start, setStart] = React.useState(false)
  let reset = false

  React.useEffect(() => {
    const locked = die.every(dice => dice.locked)
    const firstValue = die.length === 0 ? 999 : die[0].value 
    const sameValue = die.every(dice => dice.value === firstValue)
    if(locked && sameValue && die.length != 0){
      setTenzies(true)
      setStart(false)
    }
  },[die])

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
    setTenzies(false)
    setStart(true)
  }

  function rollUnlocked(){
    let tempDie = []
    setDie(prevDie => {
      for(let i=0; i<10; i++){
        if(prevDie[i].locked){
          tempDie.push(prevDie[i])
        }else{
          tempDie.push({
            ...prevDie[i],
            value: generateRandom()
          })
        }
      }
      return tempDie
    })
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

  const {width, height} = useWindowSize()
  return (
    <div className="app-container">
      <h1>Tenzies</h1>
      <Timer name="bestTime" start={start} tenzies={tenzies}/>
      <Timer name="currentTime" start={start} tenzies={tenzies}/>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">{dices}</div>
      {die.length === 0 || tenzies ? 
      <button onClick={rollAll} className="play-button">{tenzies ? "Start Again" : "Start Game"}</button> : 
      <button onClick={rollUnlocked} className="play-button">Roll</button>}
      {tenzies && <Confetti width={width-30} height={height-30}/>}
    </div>
  )
}