import { motion } from "framer-motion";
import MidiInputViewer from '../components/MidiInputViewer';
import ChordDisplay from '../components/ChordDisplay';
import Keyboard from '../components/Keyboard';
import TargetChordDisplay from '../components/TargetChordDisplay';
import { useMidiInput } from '../hooks/useMidiInput';
import { useChordChallenge } from '../hooks/useChordChallenge';

export default function ChordPractice() {
  const { midiNotes, addNote, removeNote, clearNotes } = useMidiInput();
  const { targetChord, isCorrect } = useChordChallenge(midiNotes, clearNotes);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-screen w-screen flex max-md:flex-col items-center">
        <TargetChordDisplay targetChord={targetChord} isCorrect={isCorrect}/>
        <ChordDisplay midiNotes={midiNotes}/>
      </div>
      <Keyboard midiNotes={midiNotes} addNote={addNote} removeNote={removeNote} clearNotes={clearNotes}/>
      <MidiInputViewer midiNotes={midiNotes}/>
    </motion.div>
  );
}