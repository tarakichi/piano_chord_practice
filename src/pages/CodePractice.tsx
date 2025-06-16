import MidiInputViewer from '../components/MidiInputViewer';
import ChordDisplay from '../components/ChordDisplay';
import { useEffect, useState } from 'react';
import Keyboard from '../components/Keyboard';
import RandomChord from '../components/RandomChord';

export default function CodePractice() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);

  useEffect(() => {
    setMidiNotes([60,63,67,71]);
  },[])

  return (
    <>
      <RandomChord midiNotes={midiNotes}/>
      <MidiInputViewer midiNotes={midiNotes} onMidiNotesChange={setMidiNotes}/>
      <Keyboard midiNotes={midiNotes}/>
      <ChordDisplay midiNotes={midiNotes}/>
    </>
  );
}