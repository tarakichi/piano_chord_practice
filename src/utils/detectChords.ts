import { chordTypes, type ChordData } from "../types/ChordTypes";
import { noteNames } from "../types/noteNames";

export function detectChords(noteNumbers: number[]): ChordData[] {
    const uniqueNotes = Array.from(new Set(noteNumbers.map(n => n % 12))).sort((a, b) => a - b);
    const candidates: ChordData[] = [];

    for (const root of uniqueNotes) {
        const intervalsFromRoot = uniqueNotes.map(n => (n - root + 12) % 12).sort((a, b) => a - b);

        for (const chordType of chordTypes) {
            const matched = chordType.intervals.filter(i => intervalsFromRoot.includes(i));
            const score = Math.round((matched.length / chordType.intervals.length) * 100);

            if (score >= 60) {
                const rootName = noteNames[root];
                candidates.push({
                    root: rootName,
                    type: chordType.id,
                    fullName: rootName + chordType.label,
                    score
                });
            }
        }
    }

    return candidates
        .sort((a, b) => b.score - a.score)
        .filter((c, i, self) => i === self.findIndex(o => o.fullName === c.fullName));
}