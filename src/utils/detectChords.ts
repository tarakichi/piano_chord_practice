interface ChordTemplate {
  name: string;         // 例: "major", "minor", "7", etc.
  intervals: number[];  // 半音での間隔
  aliases?: string[];   // 表記のゆれなど
}

interface ChordCandidate {
    root: string;
    name: string;
    fullName: string;
    score: number;
}

const chordTemplates: ChordTemplate[] = [
    { name: "", intervals: [0, 4, 7] },
    { name: "m", intervals: [0, 3, 7] },
    { name: "7", intervals: [0, 4, 7, 10] },
    { name: "M7", intervals: [0, 4, 7, 11] },
    { name: "m7", intervals: [0, 3, 7, 10] },
    { name: "mM7", intervals: [0, 3, 7, 11] },
    { name: "6", intervals: [0, 4, 7, 9] },
    { name: "m6", intervals: [0, 3, 7, 9] },
    { name: "sus4", intervals: [0, 5, 7] },
    { name: "sus2", intervals: [0, 2, 7] },
    { name: "aug", intervals: [0, 4, 8] },
    { name: "dim", intervals: [0, 3, 6], aliases: ["m-5"] },
    { name: "dim7", intervals: [0, 3, 6, 9] },
    { name: "m7-5", intervals: [0, 3, 6, 10] },
    { name: "add9", intervals: [0, 4, 7, 14] },
    { name: "madd9", intervals: [0, 3, 7, 14] }
];

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function detectChords(noteNumbers: number[]): ChordCandidate[] {
    const uniqueNotes = Array.from(new Set(noteNumbers.map(n => n % 12))).sort((a, b) => a - b);
    const candidates: ChordCandidate[] = [];

    for (const root of uniqueNotes) {
        const intervalsFromRoot = uniqueNotes.map(n => (n - root + 12) % 12).sort((a, b) => a - b);

        for (const template of chordTemplates) {
            const matched = template.intervals.filter(i => intervalsFromRoot.includes(i));
            const score = Math.round((matched.length / template.intervals.length) * 100);

            if (score >= 60) {
                candidates.push({
                    root: noteNames[root],
                    name: template.name,
                    fullName: noteNames[root] + template.name,
                    score
                });
            }
        }
    }

    return candidates.sort((a, b) => b.score - a.score).filter((c, i, self) => i === self.findIndex(o => o.fullName === c.fullName));
}