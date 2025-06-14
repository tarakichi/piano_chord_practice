import MidiInputViewer from '../components/MidiInputViewer';
import ChordDisplay from '../components/ChordDisplay';
import { useEffect, useState } from 'react';
import Keyboard from '../components/Keyboard';

export default function CodePractice() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);

  useEffect(() => {
    setMidiNotes([60,63,67,71]);
  },[])

  return (
    <>
      <MidiInputViewer midiNotes={midiNotes} onMidiNotesChange={setMidiNotes}/>
      <Keyboard activeNotes={midiNotes}/>
      <ChordDisplay midiNotes={midiNotes}/>
    </>
  );
}