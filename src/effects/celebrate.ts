import confetti from "canvas-confetti";
import sound from "/sounds/Jpn_S_drum.mp3";

export function celebrate() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });

    const audio = new Audio(sound);
    audio.play().catch(e => {
        console.warn("音声の再生に失敗しました:", e);
    })
}