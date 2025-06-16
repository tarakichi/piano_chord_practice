import { useEffect, useState } from "react";

const chordList = [
  "C", "Cm", "C7", "CM7", "Cm7",
  "D", "Dm", "D7", "DM7", "Dm7",
  "E", "Em", "E7", "EM7", "Em7",
  "F", "Fm", "F7", "FM7", "Fm7",
  "G", "Gm", "G7", "GM7", "Gm7",
  "A", "Am", "A7", "AM7", "Am7",
  "B", "Bm", "B7", "BM7", "Bm7"
];

interface Props {
    midiNotes: number[]
}

export default function TargetChord({ midiNotes }: Props) {
    const [currentChord, setCurrentChord] = useState<string | null>(null);

    const pickRandomChord = () => {
        const randomIndex = Math.floor(Math.random() * chordList.length);
        setCurrentChord(chordList[randomIndex]);
    };

    useEffect(() => {
        pickRandomChord()
    })

    return (
        <div className="my-5">
            <h2 className='text-zinc-50 font-bold text-xl'>目標コード</h2>
            <div className='flex justify-center bg-zinc-800 rounded-md my-2 mx-auto max-h-16 overflow-x-hidden overflow-y-auto max-w-4/5 h-16'>
                <div
                    className="
                        mx-1 my-3 rounded-md font-medium text-2xl text-zinc-50 bg-zinc-700 py-1 px-2
                        hover:shadow-lg hover:shadow-zinc-500/50 hover:brightness-110
                        transiton duration-200 ease-in-out
                    "
                >{currentChord}</div>
            </div>
        </div>
    )
}