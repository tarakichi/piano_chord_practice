const chordList = [
  "C", "Cm", "C7", "CM7", "Cm7",
  "D", "Dm", "D7", "DM7", "Dm7",
  "E", "Em", "E7", "EM7", "Em7",
  "F", "Fm", "F7", "FM7", "Fm7",
  "G", "Gm", "G7", "GM7", "Gm7",
  "A", "Am", "A7", "AM7", "Am7",
  "B", "Bm", "B7", "BM7", "Bm7"
];

export function getTargetChord() {
    return chordList[Math.floor(Math.random() * chordList.length)];
}