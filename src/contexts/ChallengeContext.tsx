import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json';

interface activeChallenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData{
    level: number;
    levelUp: () => void; 
    currentExperience: number; 
    challengesCompleted: number;
    activeChallenge: activeChallenge;
    experienceToNextLevel: number;
    resetChallenge: () => void;
    completeChallenge: () => void;
    startNewChallenge: () => void;
}

interface ChallengeProviderProps{
    children:ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children}:ChallengeProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level+1) * 4, 2);

    useEffect( () => {
        Notification.requestPermission();
    }, []);

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallenge = Math.floor(Math.random() * challenges.length);
        const currentChallenge = challenges[randomChallenge];
        setActiveChallenge(currentChallenge);

        new Audio('/public_notification.mp3').play();
        if(Notification.permission === 'granted'){
            new Notification('Novo desafio ', {
                body: 'Valendo '+ currentChallenge.amount + 'exp'});
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }
    return(
        <ChallengeContext.Provider value={{level, levelUp, 
        currentExperience, 
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        resetChallenge,
        completeChallenge,
        startNewChallenge}}>
        
            {children}
        </ChallengeContext.Provider>

    );
}