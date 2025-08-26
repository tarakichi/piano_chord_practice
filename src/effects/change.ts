import sound from "/sounds/change.mp3";

export function change() {
    const audio = new Audio(sound);
    audio.play().catch(e => {
        console.warn("音声の再生に失敗しました:", e);
    })
}