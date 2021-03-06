import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengeContext);
    const {ResetCountDown} = useContext(CountDownContext);

    function handleChallengeCompleted(){
        completeChallenge();
        ResetCountDown();
    }


    function handleFailedCompleted(){
        resetChallenge();
        ResetCountDown();
    }
    return(
        <div className= {styles.challengeBoxContainer}>

            {activeChallenge ? (
                <div className= {styles.challengeActive}>
                    <header> Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={'icons/' + activeChallenge.type + '.svg'} alt="" />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                        type = "button"
                        className = {styles.challengeFailledButton}
                        onClick = {handleFailedCompleted} 
                        > Falhei </button>

                        <button 
                        type = "button"
                        className = {styles.challengeSuceededButton}
                        onClick = {handleChallengeCompleted}
                        > Completei </button>
                    </footer>
                </div>
            ) : (
            <div className= {styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level completando desafios
                </p>
            </div>)}
            
        </div>
    )
}