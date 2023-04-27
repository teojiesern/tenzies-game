import React from "react";

export default function Timer(props){
    const [time, setTime] = React.useState(0)
    const [timerStopped, setTimerStopped] = React.useState(false)
    const [pb, setPb] = React.useState(JSON.parse(localStorage.getItem("pb")) || 10000000)

    let millisecond = Math.floor(time/10) % 100
    let second = Math.floor(time/1000) % 60
    let minutes = Math.floor(time/(60000)) % 60
    let pbMillisecond = Math.floor(pb/10) % 100
    let pbSecond = Math.floor(pb/1000) % 60
    let pbMinutes = Math.floor(pb/(60000)) % 60

    React.useEffect(() => {
        let interval
        if(props.start){
            interval = setInterval(() => setTime(prevTime => prevTime+10),10)
        }
        if(props.tenzies){
            setTimerStopped(true)
        }else{
            setTimerStopped(false)
        }
        if(time<pb && time!=0){
            setPb(time)
        }
        return () => clearInterval(interval)
    },[props.start])

    React.useEffect(() => {
        localStorage.setItem("pb",JSON.stringify(pb))
        if(!timerStopped){
            setTime(0)
        } 
        // since timerStopped won't be updated when tenzies is true, this would not reset the timer immediately but would reset the timer on the next run which is if we win the game and we press roll again
    },[timerStopped])

    return (
        <div className={props.name}>
            <p>{props.name === "bestTime" ? "Time to beat: " : "Current: "} 
            {props.name === "bestTime" ? (pb === 10000000 ? "No record" : 
            `${pbMinutes.toString().padStart(2,0)} : ${pbSecond.toString().padStart(2,0)} : ${pbMillisecond.toString().padStart(2,0)}`) :
            `${minutes.toString().padStart(2,0)} : ${second.toString().padStart(2,0)} : ${millisecond.toString().padStart(2,0)}`}</p>
        </div>
    )
}