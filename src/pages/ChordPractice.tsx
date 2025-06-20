import { motion } from "framer-motion";
import MidiInputViewer from '../components/MidiInputViewer';
import ChordDisplay from '../components/ChordDisplay';
import Keyboard from '../components/Keyboard';
import TargetChord from '../components/TargetChord';
import { useMidiInput } from '../hooks/useMidiInput';
import { useChordChallenge } from '../hooks/useChordChallenge';

export default function ChordPractice() {
  // const [midiNotes, setMidiNotes] = useState<number[]>([]);
  const { midiNotes, addNote, removeNote, clearNotes } = useMidiInput();
  const { targetChord, isCorrect } = useChordChallenge(midiNotes, clearNotes);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <TargetChord targetChord={targetChord} isCorrect={isCorrect}/>
      <MidiInputViewer midiNotes={midiNotes}/>
      <Keyboard midiNotes={midiNotes} addNote={addNote} removeNote={removeNote}/>
      <ChordDisplay midiNotes={midiNotes}/>
    </motion.div>
  );
}