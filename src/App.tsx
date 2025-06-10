import './App.css';
import MidiInputViewer from './components/MidiInputViewer';
import ChordDisplay from './components/ChordDisplay';
import { useEffect, useState } from 'react';

function App() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);

  useEffect(() => {
    setMidiNotes([60,64,67])
  },[])
  
  return (
    <>
      <MidiInputViewer midiNotes={midiNotes} onMidiNotesChange={setMidiNotes}/>
      <ChordDisplay midiNotes={midiNotes} />
    </>
  );
}

export default App;
