import './App.css';
import MidiInputViewer from './components/MidiInputViewer';
import ChordDisplay from './components/ChordDisplay';
import { useState } from 'react';

function App() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);

  return (
    <>
      <MidiInputViewer midiNotes={midiNotes} onMidiNotesChange={setMidiNotes}/>
      <ChordDisplay midiNotes={midiNotes} />
    </>
  );
}

export default App;
