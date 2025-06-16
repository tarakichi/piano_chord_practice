import { detectChords } from "../utils/detectChords";
import * as Tooltip from "@radix-ui/react-tooltip"

interface Props {
    midiNotes: number[]
    setUserChords?: (data: string[]) => void;
}

export default function ChordDisplay({ midiNotes, setUserChords }: Props) {

    const chordCandidates = detectChords(midiNotes);

    const topChords = chordCandidates.filter((chord) => chord.score === 100);
    if (setUserChords) {
        setUserChords(topChords.map((chord) => {
            return chord.fullName;
        }));
    }

    const otherChords = chordCandidates.filter((chord) => chord.score < 100);

    return (
        <div className="mt-5">
            <h2 className='text-zinc-50 font-bold text-xl'>和音の検出</h2>
            <div className="bg-zinc-800 rounded-md my-2 mx-auto chord-list">
                {midiNotes.length === 0 ? (
                    <p className='mx-1 my-3 py-1 px-2 text-zinc-50'>キーが押されていません</p>
                ) : chordCandidates.length === 0 ? (
                    <p className='mx-1 my-3 py-1 px-2 text-zinc-50'>コードが見つかりません</p>
                ) : (
                    <>
                        <ul className='flex justify-center flex-wrap'>
                            {topChords.map((chord) => (
                                <Tooltip.Provider delayDuration={100} key={chord.fullName}>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <li
                                                className="
                                                    mx-1 my-3 rounded-md font-medium text-zinc-50 bg-zinc-700 py-1 px-2
                                                    hover:shadow-lg hover:shadow-zinc-500/50 hover:brightness-110
                                                    transiton duration-200 ease-in-out
                                                "
                                            >
                                                {chord.fullName}
                                            </li>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                side="top"
                                                align="center"
                                                sideOffset={3}
                                                className="px-2 py-1 rounded bg-zinc-900 text-zinc-50 text-xs"
                                            >
                                                一致度：{chord.score}%
                                                <Tooltip.Arrow className="fill-zinc-900" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Tooltip.Provider>
                            ))}
                        </ul>
                        <ul className='flex justify-center flex-wrap'>
                            {otherChords.map((chord) => (
                                <Tooltip.Provider delayDuration={100} key={chord.fullName}>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <li
                                                className="
                                                    mx-1 my-3 rounded-md font-medium text-zinc-50 bg-zinc-800 py-1 px-2
                                                    hover:text-shadow-lg hover:text-shadow-zinc-500/50
                                                    transiton duration-200 ease-in-out
                                                "
                                            >
                                                {chord.fullName}
                                            </li>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                side="top"
                                                align="center"
                                                sideOffset={-5}
                                                className="px-2 py-1 rounded bg-zinc-900 text-zinc-50 text-xs"
                                            >
                                                一致度：{chord.score}%
                                                <Tooltip.Arrow className="fill-zinc-900" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Tooltip.Provider>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}