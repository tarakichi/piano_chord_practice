import { useEffect } from "react";

export function useMidiInput(onMidiNotesChange: (notes: number[]) => void) {
  useEffect(() => {
    const pressed: Set<number> = new Set();
    // MIDIアクセスを要求
    navigator.requestMIDIAccess().then((access) => {
      for (const input of access.inputs.values()) {
        input.onmidimessage = (message) => {
          if (!message.data) return;
          const [command, noteNumber, velocity] = message.data;
          if (command === 144 && velocity > 0) {
            pressed.add(noteNumber)
          }
          
          if (command === 128 || (command === 144 && velocity === 0)) {
            pressed.delete(noteNumber)
          }
            onMidiNotesChange(Array.from(pressed));
        }
      }
    }).catch((err) => {
      console.error("MIDI接続に失敗しました:", err);
    })
  }, [onMidiNotesChange]);
}
