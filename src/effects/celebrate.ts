import confetti from "canvas-confetti";

export function celebrate() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });

    const sound = new Audio("../assets/sounds/Jpn_S_drum.mp3");
    sound.play().catch(e => {
        console.warn("音声の再生に失敗しました:", e);
    })
}