import './App.css'
import MidiInputViewer from './components/MidiInputViewer'
import ChordDisplay from './components/ChordDisplay';
import { useState } from 'react';

function App() {
  const [notes, setNotes] = useState<string[]>([])

  return (
    <>
      <MidiInputViewer notes={notes} onNotesChange={setNotes}/>
      <ChordDisplay notes={notes} />
    </>
  )
}

export default App
