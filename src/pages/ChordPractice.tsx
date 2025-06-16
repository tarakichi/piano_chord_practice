import MidiInputViewer from '../components/MidiInputViewer';
import ChordDisplay from '../components/ChordDisplay';
import { useEffect, useState } from 'react';
import Keyboard from '../components/Keyboard';
import TargetChord from '../components/TargetChord';
import { motion } from "framer-motion";

export default function ChordPractice() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);

  useEffect(() => {
    setMidiNotes([60,63,67,71]);
  },[])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <TargetChord midiNotes={midiNotes}/>
      <MidiInputViewer midiNotes={midiNotes} onMidiNotesChange={setMidiNotes}/>
      <Keyboard midiNotes={midiNotes}/>
      <ChordDisplay midiNotes={midiNotes}/>
    </motion.div>
  );
}