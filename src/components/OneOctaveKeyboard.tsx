import "./OneOctaveKeyboard.css";

interface Props {
    activeNotes?: number[];
}

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function OneOctaveKeyboard({ activeNotes = [] }: Props) {

    const uniqueActiveNotes = Array.from(new Set(activeNotes.map(n => n % 12))).sort((a, b) => a - b);

    console.log(uniqueActiveNotes);

    return (
        <div className="flex justify-center mx-auto my-2 w-4/5 h-80">
            <div className="keyboard relative right-1/4">
                <div className="absolute top-0">
                    <ul className="white-keys flex">
                        <li className="white-key"></li>
                        <li className="white-key"></li>
                        <li className="white-key"></li>
                        <li className="white-key"></li>
                        <li className="white-key"></li>
                        <li className="white-key"></li>
                        <li className="white-key"></li>
                    </ul>
                </div>
                <div className="absolute top-0 z-10">
                    <ul className="black-keys flex pl-10">
                        <li className="black-key h-55 w-7 mr-6"></li>
                        <li className="black-key h-55 w-7 mr-6"></li>
                        <li className="h-55 w-7 mr-6"></li>
                        <li className="black-key h-55 w-7 mr-6"></li>
                        <li className="black-key h-55 w-7 mr-6"></li>
                        <li className="black-key h-55 w-7 mr-6"></li>
                        <li className="h-55 w-7 mr-6"></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}