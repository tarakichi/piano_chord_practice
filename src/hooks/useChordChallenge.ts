import { useEffect, useState } from "react";
import { detectChords } from "../utils/detectChords";
import { celebrate } from "../effects/celebrate";
import { getTargetChord } from "../utils/getTargetChord";

export function useChordChallenge(midiNotes: number[], clearNotes: () => void) {
    const [targetChord, setTargetChord] = useState<string>(getTargetChord());
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    
    useEffect(() => {
        const candidates = detectChords(midiNotes).filter(c => c.score === 100).map(c => c.fullName);
        if (candidates.includes(targetChord)) {
            setIsCorrect(true);
            celebrate();
            clearNotes();
            setTimeout(() => {
                setIsCorrect(false);
                setTargetChord(getTargetChord());
            }, 1000);
        }
    }, [midiNotes, targetChord, clearNotes]);

    return { targetChord, isCorrect };
}