export function chordMatch( userChords: string[], targetChord: string): boolean {
    for (let i = 0; i < userChords.length; i++) {
        if (userChords[i] === targetChord) {
            return true;
        }
    }
    return false;
}