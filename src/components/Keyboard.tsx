import { useState } from "react";

interface Props {
    activeNotes?: number[];
}

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getNoteName(noteNumber: number) {
  const note = noteNumber % 12;
  const octave = Math.floor(noteNumber / 12) - 1;
  return `${noteNames[note]}${octave}`;
}

interface PianoKey {
    pitch: string;
    noteName: string;
    midi: number;
    isBlack: boolean;
    isKey: boolean;
    blackKeyPosition?: "left" | "center" | "right";
}


function generateKeyboardRange(startNote: number, endNote: number) {
    const result: PianoKey[] = [];

    for (let midi = startNote; midi <= endNote; midi++) {
        const note = noteNames[midi % 12];
        const isBlack = note.includes("#");

        result.push({
            pitch: `${note}${Math.floor(midi / 12) - 1}`,
            noteName: note,
            midi,
            isBlack,
            isKey: true,
            blackKeyPosition: isBlack
                ? (note === "C#" || note === "F#") ? "left" :
                    (note === "G#") ? "center" : "right"
                : undefined,
        });
    }

    return result;
}

export default function Keyboard({ activeNotes = [] }: Props) {

    const [isFullRange, setIsFullRange] = useState(false);
    const activeNotesName = Array.from(activeNotes.map(n => getNoteName(n)));
    const uniqueActiveNotesName = Array.from(new Set(activeNotesName.map(n => n.slice(0, -1))));
    const keys = generateKeyboardRange(60, 72)

    return (
        <div className="w-screen flex flex-col justify-center items-center">
            <div className="flex items-start w-4/5">
                <div className="flex items-center mx-1">
                    <label className="switch">
                        <input
                            id="keyboard-view-range"
                            type="checkbox"
                            checked={isFullRange}
                            onChange={() => setIsFullRange(!isFullRange)}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span className="m-2 text-zinc-50">{isFullRange ? "88鍵" : "1オクターブ"}</span>
                </div>
            </div>
            <div className="flex justify-center mx-auto mt-2 mb-5 w-4/5 h-80">
                    <ul className="absolute white-keys flex">
                        {keys.filter(k => !k.isBlack).map(k => (
                            <li key={k.pitch} className={`white-key ${uniqueActiveNotesName.includes(k.noteName) ? "active" : ""}`}></li>
                        ))}
                    </ul>
                    <ul className={`absolute black-keys flex z-10 ${keys[0].isBlack ? ("-translate-x-11") : ("-translate-x-4")}`}>
                        {keys[0].isBlack ? <li className="black-key-frame"></li> : ""}
                        {keys.filter(k => k.isBlack).map(k => ( k.blackKeyPosition === "left" ? (
                                <>
                                    <li key={"before-" + k.pitch} className="black-key-frame"></li>
                                    <li key={k.pitch} className={`black-key-frame black-key ${uniqueActiveNotesName.includes(k.noteName) ? "active" : ""}`}></li>
                                </>
                            ) : ( k.blackKeyPosition === "center" ? (
                                    <li key={k.pitch} className={`black-key-frame black-key ${uniqueActiveNotesName.includes(k.noteName) ? "active" : ""}`}></li>
                                ) : (
                                    <li key={k.pitch} className={`black-key-frame black-key ${uniqueActiveNotesName.includes(k.noteName) ? "active" : ""}`}></li>
                                )
                            )
                        ))}
                    </ul>
            </div>
        </div>
    )
}