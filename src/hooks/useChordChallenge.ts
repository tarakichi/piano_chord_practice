import { useEffect, useState, useRef } from "react";
import { detectChords } from "../utils/detectChords";
import { celebrate } from "../effects/celebrate";
import { getTargetChord } from "../utils/getTargetChord";
import { change } from "../effects/change";

export function useChordChallenge(midiNotes: number[], clearNotes: () => void, isStrict: boolean) {
    const [targetChord, setTargetChord] = useState<string>(getTargetChord());
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const timeoutRef = useRef<number | null>(null);
    
    useEffect(() => {
        const candidates = detectChords(midiNotes, isStrict)
            .filter(c => c.score === 100)
            .map(c => c.fullName);
        if (candidates.includes(targetChord) && !isCorrect) {
            setIsCorrect(true);
            celebrate();
            timeoutRef.current = setTimeout(() => {
                clearNotes();
                setIsCorrect(false);
                setTargetChord(getTargetChord());
                change();
            }, 1000);
        }
    }, [midiNotes, targetChord, clearNotes, isCorrect, isStrict]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, []);

    return { targetChord, isCorrect };
}