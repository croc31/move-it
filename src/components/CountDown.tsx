import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css';


export default function CountDown(){
    const {minutes, seconds, hasFinished, isActive, StartCountDown, ResetCountDown} = useContext(CountDownContext);    

    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
    
    
   
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
                <button type="button" 
                className={styles.countDownButton}  
                onClick= {StartCountDown}>
                    Iniciar
                </button>
                )}
                </>
            )}

           
            
        </div>
    );
}