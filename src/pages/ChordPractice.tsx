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
      <div className="w-screen flex justify-center">
        <div className="flex justify-center max-w-4/5 items-center max-h-40 overflow-x-hidden overflow-y-auto h-40">
          <TargetChordDisplay targetChord={targetChord} isCorrect={isCorrect}/>
          <ChordDisplay midiNotes={midiNotes}/>
        </div>
      </div>
      <Keyboard midiNotes={midiNotes} addNote={addNote} removeNote={removeNote}/>
      <MidiInputViewer midiNotes={midiNotes}/>
    </motion.div>
  );
}