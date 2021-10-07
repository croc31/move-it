import { createContext, ReactNode, useState } from "react";
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

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallenge = Math.floor(Math.random() * challenges.length);
        const currentChallenge = challenges[randomChallenge];
        setActiveChallenge(currentChallenge);
    }
    return(
        <ChallengeContext.Provider value={{level, levelUp, 
        currentExperience, 
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        startNewChallenge}}>
        
            {children}
        </ChallengeContext.Provider>

    );
}