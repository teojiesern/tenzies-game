import React from "react";

export default function Timer(props){
    const [time, setTime] = React.useState(0)

    let millisecond = Math.floor(time/1000) % 100
    let second = Math.floor(time/60000) % 60
    let minutes = Math.floor(time/(3600000)) % 60

    if(props.start){
            let interval = setInterval(() => setTime(prevTime => prevTime+1),10)
    }
    
    return (
        <div className={props.name}>
            <p>{`${props.name === "bestTime" ? "Time to beat:" : "Current:"} 
            ${minutes.toString().padStart(2,0)} : ${second.toString().padStart(2,0)} : ${millisecond.toString().padStart(2,0)}`}</p>
        </div>
    )
}