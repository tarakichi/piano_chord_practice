const chordList = [
  "C", "Cm", "C7", "CM7", "Cm7",
  "C#", "C#m", "C#7", "C#M7", "C#m7",
  "D", "Dm", "D7", "DM7", "Dm7",
  "D#", "D#m", "D#7", "D#M7", "D#m7",
  "E", "Em", "E7", "EM7", "Em7",
  "F", "Fm", "F7", "FM7", "Fm7",
  "F#", "F#m", "F#7", "F#M7", "F#m7",
  "G", "Gm", "G7", "GM7", "Gm7",
  "G#", "G#m", "G#7", "G#M7", "G#m7",
  "A", "Am", "A7", "AM7", "Am7",
  "A#", "A#", "A#7", "A#M7", "A#m7",
  "B", "Bm", "B7", "BM7", "Bm7"
];

export function getTargetChord() {
    return chordList[Math.floor(Math.random() * chordList.length)];
}