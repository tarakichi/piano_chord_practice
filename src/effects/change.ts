export function change() {
    const sound = new Audio("/sounds/change.mp3");
    sound.play().catch(e => {
        console.warn("音声の再生に失敗しました:", e);
    })
}