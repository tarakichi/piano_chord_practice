import { useEffect } from 'react'

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function getNoteName(noteNumber: number) {
  const note = noteNumber % 12
  const octave = Math.floor(noteNumber / 12) - 1
  return `${noteNames[note]}${octave}`
}

interface Props {
    midiNotes: number[]
    onMidiNotesChange: (notes: number[]) => void
}

export default function MidiInputViewer({ midiNotes, onMidiNotesChange }: Props) {

  useEffect(() => {
    const pressed: Set<number> = new Set()
    // MIDIアクセスを要求
    navigator.requestMIDIAccess().then((access) => {
      for (const input of access.inputs.values()) {
        input.onmidimessage = (message) => {
          if (!message.data) return
          const [command, noteNumber, velocity] = message.data
          if (command === 144 && velocity > 0) {
            pressed.add(noteNumber)
          }
          
          if (command === 128 || (command === 144 && velocity === 0)) {
            pressed.delete(noteNumber)
          }

          onMidiNotesChange(Array.from(pressed))
        }
      }
    }).catch((err) => {
      console.error("MIDI接続に失敗しました:", err)
    })
  }, [onMidiNotesChange])

  return (
    <>
      <h2>MIDI入力</h2>
      {midiNotes.length === 0 ? (
        <p>何も押されていません</p>
      ) : (
        <ul style={{display: "flex", padding: 0, justifyContent: "center"}}>
          {midiNotes.map((midiNote) => (
            <li key={midiNote} style={{listStyle: "none", margin: "0 0.25rem"}}>{getNoteName(midiNote)}</li>
          ))}
        </ul>
      )}
    </>
  )
}