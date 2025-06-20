import { useCallback, useEffect, useState } from "react";

export function useMidiInput() {
  const [midiNotes, setMidiNotes] = useState<number[]>([]);
  
  useEffect(() => {
    const pressed = new Set<number>();
    navigator.requestMIDIAccess()
      .then((access) => {
        for (const input of access.inputs.values()) {
          input.onmidimessage = ({ data }) => {
            if (!data) return; //要調整
            const [cmd, note, vel] = data;
            if (cmd === 144 && vel > 0) pressed.add(note);
            if (cmd === 128 || (cmd === 144 && vel === 0)) pressed.delete(note);
            setMidiNotes(Array.from(pressed));
          }
        }
      }).catch(console.error);
  }, []);

  const addNote = useCallback((note: number) => {
    setMidiNotes((prev) => Array.from(new Set([...prev, note])));
  }, []);

  const removeNote = useCallback((note: number) => {
    setMidiNotes((prev) => prev.filter((n) => n !== note));
  }, []);

  const clearNotes = useCallback(() => {
    setMidiNotes([]);
  }, [])

  return { midiNotes, addNote, removeNote, clearNotes };
}