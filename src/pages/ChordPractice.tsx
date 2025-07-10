import { motion } from "framer-motion";
import MidiInputViewer from '../components/MidiInputViewer';
import ChordDisplay from '../components/ChordDisplay';
import Keyboard from '../components/Keyboard';
import TargetChordDisplay from '../components/TargetChordDisplay';
import { useMidiInput } from '../hooks/useMidiInput';
import { useChordChallenge } from '../hooks/useChordChallenge';
import { useCallback, useState } from "react";

export default function ChordPractice() {
  const { midiNotes, addNote, removeNote, clearNotes } = useMidiInput();
  const [isStrict, setIsStrict] = useState<boolean>(false);
  const { targetChord, isCorrect } = useChordChallenge(midiNotes, clearNotes, isStrict);
  const [isFullRange, setIsFullRange] = useState(false);

  const handleChangeKeyboardRange = () => {
    setIsFullRange(!isFullRange);
    clearNotes();
  }
  
  const handleStrict = useCallback(() => {
      setIsStrict(!isStrict);  
  }, [isStrict]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-screen w-screen flex max-md:flex-col items-center">
        <div className="w-screen flex flex-col justify-center items-center">
            <div className="flex items-start w-4/5">
              <div className="flex items-center mx-1">
                <label className="switch">
                  <input
                      id="keyboard-view-range"
                      type="checkbox"
                      checked={isStrict}
                      onChange={handleStrict}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="m-2 text-zinc-50">{isStrict ? "厳密" : "厳密"}</span>
              </div>
            </div>
            <div className="flex items-start w-4/5">
                <div className="flex items-center mx-1">
                  <label className="switch">
                    <input
                      id="keyboard-view-range"
                      type="checkbox"
                      checked={isFullRange}
                      onChange={handleChangeKeyboardRange}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="m-2 text-zinc-50">{isFullRange ? "88鍵" : "88鍵"}</span>
                </div>
            </div>
          </div>
        <TargetChordDisplay targetChord={targetChord} isCorrect={isCorrect}/>
        <ChordDisplay midiNotes={midiNotes}/>
      </div>
      <Keyboard midiNotes={midiNotes} addNote={addNote} removeNote={removeNote} isFullRange={isFullRange} />
      <MidiInputViewer midiNotes={midiNotes}/>
    </motion.div>
  );
}