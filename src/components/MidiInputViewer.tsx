import { useEffect } from 'react';

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getNoteName(noteNumber: number) {
  const note = noteNumber % 12;
  const octave = Math.floor(noteNumber / 12) - 1;
  return `${noteNames[note]}${octave}`;
}

interface Props {
    midiNotes: number[];
    onMidiNotesChange: (notes: number[]) => void;
}

export default function MidiInputViewer({ midiNotes, onMidiNotesChange }: Props) {

  useEffect(() => {
    const pressed: Set<number> = new Set();
    // MIDIアクセスを要求
    navigator.requestMIDIAccess().then((access) => {
      for (const input of access.inputs.values()) {
        input.onmidimessage = (message) => {
          if (!message.data) return;
          const [command, noteNumber, velocity] = message.data;
          if (command === 144 && velocity > 0) {
            pressed.add(noteNumber)
          }
          
          if (command === 128 || (command === 144 && velocity === 0)) {
            pressed.delete(noteNumber)
          }

          onMidiNotesChange(Array.from(pressed));
        }
      }
    }).catch((err) => {
      console.error("MIDI接続に失敗しました:", err);
    })
  }, [onMidiNotesChange]);

  return (
    <div className='mb-5'>
      <h2 className='text-zinc-50 font-bold text-xl'>MIDI入力</h2>
      <div className='bg-zinc-800 rounded-md my-2 mx-auto note-list'>
        {midiNotes.length === 0 ? (
          <p className='text-zinc-50'>何も押されていません</p>
        ) : (
          <ul className='flex justify-center flex-wrap'>
            {midiNotes.map((midiNote) => (
              <li
                key={midiNote}
                className="
                    mx-1 my-3 rounded-md font-medium text-zinc-50 bg-zinc-700 py-1 px-2
                    hover:shadow-lg hover:shadow-zinc-500/50 hover:brightness-110
                    transiton duration-200 ease-in-out
                "
            >
                {getNoteName(midiNote)}
            </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}