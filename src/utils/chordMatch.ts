export function chordMatch( userChord: string[], targetChord: string): boolean {
    userChord.map((chord) => {
        if (chord === targetChord) {
            return true;
        }
    })
    return false;
}