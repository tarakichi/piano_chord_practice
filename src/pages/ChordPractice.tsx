import { useState } from 'react';
import { motion } from "framer-motion";
import MidiInputViewer from '../components/MidiInputViewer';
import ChordDisplay from '../components/ChordDisplay';
import Keyboard from '../components/Keyboard';
import TargetChord from '../components/TargetChord';

export default function ChordPractice() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <TargetChord midiNotes={midiNotes}/>
      <MidiInputViewer midiNotes={midiNotes} onMidiNotesChange={setMidiNotes}/>
      <Keyboard midiNotes={midiNotes}/>
      <ChordDisplay midiNotes={midiNotes}/>
    </motion.div>
  );
}