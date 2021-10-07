import { useState, useEffect, useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CountDown.module.css';

let countdownTimeout : NodeJS.Timeout;

export default function CountDown(){
    const { startNewChallenge } = useContext(ChallengeContext);

    const[time, setTime] = useState(0.1 * 60);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
    
    
    function StartCountDown(){
        setIsActive(true);
    } 

    function ResetCountDown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
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
        <div>
            <div className={styles.CountDownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button type="button"
                disabled
                className={styles.countDownButton} > 
                    Ciclo Encerrado
                </button>
            ): (
                <>
                 { isActive ? (
                <button type="button"
                className={styles.countDownButton + " " + styles.countDownButtonActive}  
                onClick= {ResetCountDown}>
                    Abandonar ciclo
                </button>

                ) : (
                <button type="button" className={styles.countDownButton}  onClick= {StartCountDown}>
                    Iniciar
                </button>
                )}
                </>
            )}

           
            
        </div>
    );
}