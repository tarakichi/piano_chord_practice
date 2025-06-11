import { detectChords } from "../utils/detectChords";

interface Props {
    midiNotes: number[]
}

// interface ChordTemplate {
//   name: string;         // 例: "major", "minor", "7", etc.
//   intervals: number[];  // 半音での間隔
//   aliases?: string[];   // 表記のゆれなど
// }
// 
// const chordTemplates: ChordTemplate[] = [
//     { name: "", intervals: [0, 4, 7] },
//     { name: "m", intervals: [0, 3, 7] },
//     { name: "7", intervals: [0, 4, 7, 10] },
//     { name: "M7", intervals: [0, 4, 7, 11] },
//     { name: "m7", intervals: [0, 3, 7, 10] },
//     { name: "mM7", intervals: [0, 3, 7, 11] },
//     { name: "6", intervals: [0, 4, 7, 9] },
//     { name: "m6", intervals: [0, 3, 7, 9] },
//     { name: "sus4", intervals: [0, 5, 7] },
//     { name: "sus2", intervals: [0, 2, 7] },
//     { name: "aug", intervals: [0, 4, 8] },
//     { name: "dim", intervals: [0, 3, 6], aliases: ["m-5"] },
//     { name: "dim7", intervals: [0, 3, 6, 9] },
//     { name: "m7-5", intervals: [0, 3, 6, 10] },
//     { name: "add9", intervals: [0, 4, 7, 14] },
//     { name: "madd9", intervals: [0, 3, 7, 14] }
// ];
// 
// function normalizeNotes(noteNumbers: number[], root: number): number[] {
//   return noteNumbers.map(n => (n - root + 12) % 12).sort((a, b) => a - b);
// }
// 
// function detectChordCandidates(noteNumbers: number[]): string[] {
//   const uniqueNotes = Array.from(new Set(noteNumbers.map(n => n % 12)));
// 
//   const results: string[] = [];
// 
//   for (const root of uniqueNotes) {
//     const normalized = normalizeNotes(noteNumbers, root);
// 
//     for (const template of chordTemplates) {
//       const match = template.intervals.every(interval => normalized.includes(interval));
//       if (match) {
//         const rootName = noteNames[root]; // noteNames[0] = "C", etc.
//         results.push(`${rootName}${template.name}`);
//       }
//     }
//   }
// 
//   return results;
// }
// 
// const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function ChordDisplay({ midiNotes }: Props) {
    // const chords = detectChordCandidates(midiNotes);

    const chordCandidates = detectChords(midiNotes);

    return (
        <div>
            {/* <h2>和音の検出</h2>
            {midiNotes.length === 0 ? (
                <p>キーが押されていません</p>
            ) : chords.length === 0 ? (
                <p>コードが見つかりません</p>
            ) : (
                <ul style={{display: "flex", padding: 0, justifyContent: "center"}}>
                    {chords.map((chord) => (
                        <li key={chord} style={{listStyle: "none", margin: "0 0.25rem"}}>{chord}</li>
                    ))}
                </ul>
            )} */}
            <h2 className='text-zinc-50 font-bold text-xl'>和音の検出</h2>
            {midiNotes.length === 0 ? (
                <p className='text-zinc-50'>キーが押されていません</p>
            ) : chordCandidates.length === 0 ? (
                <p className='text-zinc-50'>コードが見つかりません</p>
            ) : (
                <ul className='flex justify-center flex-wrap'>
                    {chordCandidates.map((chord) => (
                        chord.score === 100 ? (
                            <li key={chord.fullName} className='mx-1 my-3 rounded-md font-medium text-zinc-50 bg-zinc-800 py-1 px-2'>
                                {chord.fullName}<br></br>
                                {chord.score}%
                            </li>
                        ) : (
                            <li key={chord.fullName} className='mx-1 my-3 rounded-md font-medium text-zinc-50 py-1 px-2'>
                                {chord.fullName}<br></br>
                                {chord.score}%
                            </li>
                        )
                    ))}
                </ul>
            )}
        </div>
    );
}