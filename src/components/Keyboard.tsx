import React from "react";
// import "./Keyboard.css";

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function generateKeyboardRange(start: number, end: number) {
    return Array.from({ length: end - start + 1}, (_, i) => {
        const midi = start + i;
        const note = noteNames[midi % 12];
        const isBlack = note.includes("#");
        return {
            midi,
            note,
            isBlack,
            noteWithOctave: `${note}${Math.floor(midi / 12) - 1}`
        };
    });
}

interface KeyboardProps {
    activeNotes?: number[];
}

export default function Keyboard({ activeNotes = [] }: KeyboardProps) {
    const keys = generateKeyboardRange(60, 71);

    return (
        <div className="keyboard">
            <div className="white-keys">
                {keys.filter(k => !k.isBlack).map(k => (
                    <div
                        key={k.midi}
                        className={`white-key ${activeNotes.includes(k.midi) ? "active" : ""}`}
                    >
                        {k.noteWithOctave}
                    </div>
                ))}
            </div>
            <div className="black-keys">
                {keys.filter(k => k.isBlack).map(k => (
                    <div
                        key={k.midi}
                        className={`black-key ${activeNotes.includes(k.midi) ? "active" : ""}`}
                    >
                        {k.noteWithOctave}
                    </div>
                ))}
            </div>
        </div>
    )
}