import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import MidiInputViewer from '../components/MidiInputViewer';
import ChordDisplay from '../components/ChordDisplay';
import Keyboard from '../components/Keyboard';
import { getTargetChord } from '../utils/TargetChord';
import { chordMatch } from '../utils/chordMatch';

export default function ChordPractice() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);
  const [question, setQuestion] = useState(getTargetChord());
  const [userChords, setUserChords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (chordMatch(userChords, question)) {
      setIsCorrect(true);
      setTimeout(() => {
        setQuestion(getTargetChord());
        setIsCorrect(null);
      })
    }
  },[userChords, question])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <MidiInputViewer midiNotes={midiNotes} onMidiNotesChange={setMidiNotes}/>
      <Keyboard midiNotes={midiNotes}/>
      <ChordDisplay midiNotes={midiNotes} setUserChords={setUserChords([])}/>
    </motion.div>
  );
}