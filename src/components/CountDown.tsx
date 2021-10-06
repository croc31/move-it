import { useState, useEffect } from 'react';
import styles from '../styles/components/CountDown.module.css';


export default function CountDown(){
    const[time, setTime] = useState(25 * 60);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [active, setActive] = useState(false);

    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
    
    
    function StartCountDown(){
        setActive(true);
    }

    useEffect( () => {
        if (active && time > 0) {
            setTimeout(() => { setTime(time-1)},1000);
        }else{

        }

    }, [active, time]);
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
            
            <button type="button" className={styles.countDownButton}  onClick= {StartCountDown}>
                iniciar
            </button>
        </div>
    );
}