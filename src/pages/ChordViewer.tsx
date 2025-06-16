import MidiInputViewer from '../components/MidiInputViewer';
import ChordDisplay from '../components/ChordDisplay';
import { useState } from 'react';
import Keyboard from '../components/Keyboard';

export default function ChordViewer() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);

  return (
    <>
      <MidiInputViewer midiNotes={midiNotes} onMidiNotesChange={setMidiNotes}/>
      <Keyboard midiNotes={midiNotes}/>
      <ChordDisplay midiNotes={midiNotes}/>
    </>
  );
}
