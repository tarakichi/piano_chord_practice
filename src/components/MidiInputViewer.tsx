import { useEffect, useState } from 'react'

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function getNoteName(noteNumber: number) {
  const note = noteNumber % 12
  const octave = Math.floor(noteNumber / 12) - 1
  return `${noteNames[note]}${octave}`
}

export default function MidiInputViewer() {
  const [notes, setNotes] = useState<string[]>([])

  useEffect(() => {
    // MIDIアクセスを要求
    navigator.requestMIDIAccess().then((access) => {
      for (const input of access.inputs.values()) {
        input.onmidimessage = (message) => {
          if (!message.data) return
          const [command, noteNumber, velocity] = message.data
          const noteName = getNoteName(noteNumber)
          if (command === 144 && velocity > 0) {
            setNotes((prev) => {
              if (!prev.includes(noteName)) {
                return [...prev, noteName]
              }
              return prev
            })
          }
          
          if (command === 128 || (command === 144 && velocity === 0)) {
            setNotes((prev) => prev.filter((n) => n !== noteName))
          }
        }
      }
    }).catch((err) => {
      console.error("MIDI接続に失敗しました:", err)
    })
  }, [])

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