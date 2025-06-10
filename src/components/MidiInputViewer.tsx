import { useEffect } from 'react'

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function getNoteName(noteNumber: number) {
  const note = noteNumber % 12
  const octave = Math.floor(noteNumber / 12) - 1
  return `${noteNames[note]}${octave}`
}

interface Props {
    notes: string[]
    onNotesChange: (notes: string[]) => void
}

export default function MidiInputViewer({ notes, onNotesChange }: Props) {

  useEffect(() => {
    const pressed: Set<string> = new Set()
    // MIDIアクセスを要求
    navigator.requestMIDIAccess().then((access) => {
      for (const input of access.inputs.values()) {
        input.onmidimessage = (message) => {
          if (!message.data) return
          const [command, noteNumber, velocity] = message.data
          const noteName = getNoteName(noteNumber)
          if (command === 144 && velocity > 0) {
            pressed.add(noteName)
          }
          
          if (command === 128 || (command === 144 && velocity === 0)) {
            pressed.delete(noteName)
          }

          onNotesChange(Array.from(pressed))
        }
      }
    }).catch((err) => {
      console.error("MIDI接続に失敗しました:", err)
    })
  }, [onNotesChange])

  return (
    <>
      <h2>MIDI入力</h2>
      {notes.length === 0 ? (
        <p>何も押されていません</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </>
  )
}