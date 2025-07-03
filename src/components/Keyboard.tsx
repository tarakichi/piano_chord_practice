import { useState } from "react";

interface Props {
    midiNotes: number[];
    addNote: (note: number) => void;
    removeNote: (note: number) => void;
    clearNotes: () => void;
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

interface RenderItem {
    key: string;
    isKey: boolean;
    isActive: boolean;
    className: string;
    midi?: number;
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

function generateWhiteKeyRenderItems(
    keys: PianoKey[],
    activeNotes: string[],
    isFullRange: boolean
): RenderItem[] {
    return keys.filter(k => !k.isBlack).map(k => {
        const isActive = isFullRange ? activeNotes.includes(k.pitch) : activeNotes.map(n => n.slice(0, -1)).includes(k.noteName);
        return {
            key: k.pitch,
            isKey: true,
            isActive: isActive,
            className: `white-key${isActive ? " active" : ""}`,
            midi: k.midi
        };
    });
}

function generateBlackKeyRenderItems(
    keys: PianoKey[],
    activeNotes: string[],
    isFullRange: boolean
): RenderItem[] {
    const items: RenderItem[] = [];
    keys.forEach((k, i) => {
        if (!k.isBlack && i == 0) {
            items.push({
                key: `empty-${i}-1`,
                isKey: false,
                isActive: false,
                className: "black-key-frame",
            })
        }
        if (!k.isBlack && i == keys.length - 1) {
            items.push({
                key: `empty-${i}-2`,
                isKey: false,
                isActive: false,
                className: "black-key-frame",
            })
        }
        if((!k.isBlack && k.noteName == "F" && keys[i - 1]) || (!k.isBlack && k.noteName == "C" && keys[i - 1])) {
            items.push({
                key: `empty-${i}-3`,
                isKey: false,
                isActive: false,
                className: "black-key-frame",
            })
        }
        if (k.isBlack) {
            const isActive = isFullRange ? activeNotes.includes(k.pitch) : activeNotes.map(n => n.slice(0, -1)).includes(k.noteName);
            items.push({
                key: k.pitch,
                isKey: true,
                isActive: isActive,
                className: `black-key${isActive ? " active": ""}`,
                midi: k.midi
            });
        }
    })

    return items;
}

export default function Keyboard({ midiNotes = [], addNote, removeNote, clearNotes}: Props) {

    const [isFullRange, setIsFullRange] = useState(false);
    const activeNotesName = midiNotes.map(n => getNoteName(n));
    const keys = isFullRange ? generateKeyboardRange(21, 108) : generateKeyboardRange(60, 71);
    const handleChangeKeyboardRange = () => {
        setIsFullRange(!isFullRange);
        clearNotes();
    }

    return (
        <>
            <div className="w-screen flex flex-col justify-center items-center">
                <div className="flex items-start w-4/5">
                    <div className="flex items-center mx-1">
                        <label className="switch">
                            <input
                                id="keyboard-view-range"
                                type="checkbox"
                                checked={isFullRange}
                                onChange={handleChangeKeyboardRange}
                            />
                            <span className="slider round"></span>
                        </label>
                        <span className="m-2 text-zinc-50">{isFullRange ? "88鍵" : "88鍵"}</span>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto overflow-y-hidden w-screen h-87 px-10 mt-3">
                <div className="relative mx-auto mt-2 mb-5 w-fit">
                    <ul className="white-keys flex">
                        {generateWhiteKeyRenderItems(keys, activeNotesName, isFullRange).map(item => (
                            <li key={item.key} className={item.className} onClick={() => item.midi ? (item.isActive ? removeNote(item.midi) : addNote(item.midi)) : undefined}></li>
                        ))}
                    </ul>
                    <ul className={"absolute black-keys flex z-10 top-0 -left-4 pointer-events-none"}>
                        {generateBlackKeyRenderItems(keys, activeNotesName, isFullRange).map(item => (
                            <li key={item.key} className={item.className} onClick={() => item.midi ? (item.isActive ? removeNote(item.midi) : addNote(item.midi)) : undefined}></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}