import { useEffect, useState } from "react";
import { detectChords } from "../utils/detectChords";
import confetti from "canvas-confetti";

interface Props {
    midiNotes: number[];
}

const chordList = [
  "C", "Cm", "C7", "CM7", "Cm7",
  "D", "Dm", "D7", "DM7", "Dm7",
  "E", "Em", "E7", "EM7", "Em7",
  "F", "Fm", "F7", "FM7", "Fm7",
  "G", "Gm", "G7", "GM7", "Gm7",
  "A", "Am", "A7", "AM7", "Am7",
  "B", "Bm", "B7", "BM7", "Bm7"
];

function getTargetChord() {
    return chordList[Math.floor(Math.random() * chordList.length)];
}

function chordMatch( userChords: string[], targetChord: string): boolean {
    for (let i = 0; i < userChords.length; i++) {
        if (userChords[i] === targetChord) {
            return true;
        }
    }
    return false;
}

function celebrate() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });

    const sound = new Audio("/sounds/Jpn_S_drum.mp3");
    sound.play().catch(e => {
        console.warn("音声の再生に失敗しました:", e);
    })
}

export default function TargetChord({ midiNotes }: Props) {
    const [target, setTarget] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);

    useEffect(() => {
        const chordCandidates = detectChords(midiNotes).filter((chord) => chord.score === 100).map((chord) => chord.fullName);
        if (!target) {
            setTarget(getTargetChord());
        } else {
            setIsCorrect(chordMatch(chordCandidates, target));
        }
        if (isCorrect) {
            setIsCorrect(false);
            setTarget(getTargetChord());
            celebrate();
        }
    }, [midiNotes, isCorrect, target]);

    return (
        <div className="mb-5">
            <h2 className='text-zinc-50 font-bold text-xl'>目標コード</h2>
            <div className="flex justify-center items-center bg-zinc-800 rounded-md my-2 mx-auto overflow-x-hidden overflow-y-auto max-w-4/5">
                <div
                    className={`
                        mx-1 my-3 rounded-md font-medium text-2xl text-zinc-50 bg-zinc-700 py-3 px-5
                        hover:shadow-lg hover:shadow-zinc-500/50 hover:brightness-110
                        transiton duration-200 ease-in-out ${isCorrect ? "brightness-150" : ""}
                    `}
                >
                    {target}
                </div>
                {isCorrect === true ? (<div className="absolute">正解</div>) : ("")}
            </div>
        </div>
    )
}