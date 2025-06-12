interface Props {
    activeNotes?: number[];
}

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getNoteName(noteNumber: number) {
  const note = noteNumber % 12;
  const octave = Math.floor(noteNumber / 12) - 1;
  return `${noteNames[note]}${octave}`;
}

const keys = [
    { note: "C", isBlack: false },
    { note: "C#", isBlack: true, blackKeyPosition: "left" },
    { note: "D", isBlack: false },
    { note: "D#", isBlack: true, blackKeyPosition: "right" },
    { note: "E", isBlack: false },
    { note: "F", isBlack: false },
    { note: "F#", isBlack: true, blackKeyPosition: "left" },
    { note: "G", isBlack: false },
    { note: "G#", isBlack: true, blackKeyPosition: "center" },
    { note: "A", isBlack: false },
    { note: "A#", isBlack: true, blackKeyPosition: "right" },
    { note: "B", isBlack: false },
];

export default function OneOctaveKeyboard({ activeNotes = [] }: Props) {

    const uniqueActiveNotes = Array.from(new Set(activeNotes.map(n => getNoteName(n % 12).slice(0, -2))));

    console.log(uniqueActiveNotes);

    return (
        <div className="w-screen">
            <div className="flex justify-center mx-auto mt-2 mb-5 w-4/5 h-80">
                    <ul className="absolute white-keys flex">
                        {keys.filter(k => !k.isBlack).map(k => (
                            <li key={k.note} className={`white-key ${uniqueActiveNotes.includes(k.note) ? "active" : ""}`}></li>
                        ))}
                    </ul>
                    <ul className="absolute black-keys flex z-10 translate-x-10">
                        {keys.filter(k => k.isBlack).map(k => ( k.blackKeyPosition === "left" ? (
                                <li key={k.note} className={`black-key-frame black-key ${uniqueActiveNotes.includes(k.note) ? "active" : ""}`}></li>
                            ) : ( k.blackKeyPosition === "center" ? (
                                    <li key={k.note} className={`black-key-frame black-key ${uniqueActiveNotes.includes(k.note) ? "active" : ""}`}></li>
                                ) : (
                                    <>
                                        <li key={k.note} className={`black-key-frame black-key ${uniqueActiveNotes.includes(k.note) ? "active" : ""}`}></li>
                                        <li className="black-key-frame"></li>
                                    </>
                                )
                            )
                        ))}
                    </ul>
            </div>
        </div>
    )
}