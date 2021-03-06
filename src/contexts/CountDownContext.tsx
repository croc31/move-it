import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";


let countdownTimeout : NodeJS.Timeout;

interface CountDownContextData{
    minutes : number ,
    seconds : number,
    hasFinished : boolean,
    isActive : boolean,
    StartCountDown : () => void,
    ResetCountDown : () => void
}

interface CountDownProviderProps{
    children: ReactNode;
}


export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider ({children}: CountDownProviderProps){
    const { startNewChallenge } = useContext(ChallengeContext);

    const[time, setTime] = useState(0.1 * 60);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    function StartCountDown(){
        setIsActive(true);
    } 

    function ResetCountDown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);

    }

    useEffect( () => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => { setTime(time-1)},1000);
        }else if(isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
            
        }

    }, [isActive, time]);
    return(
        <CountDownContext.Provider value = {{
            minutes,
            seconds,
            hasFinished,
            isActive,
            StartCountDown,
            ResetCountDown
        }}>
        {children}
        </CountDownContext.Provider>

    )
}