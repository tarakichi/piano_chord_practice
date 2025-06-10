interface Props {
    notes: string[]
}

function detectChord(notes: string[]): string | null {
    const sortedNotes = notes.map(n => n.slice(0, -1)).sort()

    const triads = [
        ["C", "E", "G"],
    ]

    for (const triad of triads) {
        if (triad.every(n => sortedNotes.includes(n))) {
            return triad.join("-") + " chord"
        }
    }

    return null
}

export default function ChordDisplay({ notes }: Props) {
    const chord = detectChord(notes)

    return (
        <div>
            <h2>和音の検出</h2>
            {notes.length === 0 ? (
                <p>キーが押されていません</p>
            ) : chord ? (
                <p>コード：{chord}</p>
            ) : (
                <p>コードが見つかりません</p>
            )}
        </div>
    )
}