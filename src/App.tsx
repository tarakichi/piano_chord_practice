import './App.css';
import MidiInputViewer from './components/MidiInputViewer';
import ChordDisplay from './components/ChordDisplay';
import { useEffect, useState } from 'react';

function App() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);

  useEffect(() => {
    // setMidiNotes([60,63,67,71])
    setMidiNotes([60,63,67,71,72,73,74,75,76,77,78,79,80])
  },[])
  
  return (
    <>
      <MidiInputViewer midiNotes={midiNotes} onMidiNotesChange={setMidiNotes}/>
      <ChordDisplay midiNotes={midiNotes} />
    </>
  );
}

export default App;
