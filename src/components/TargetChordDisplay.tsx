interface Props {
    targetChord: string;
    isCorrect: boolean;
}

export default function TargetChordDisplay({ targetChord, isCorrect }: Props) {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h2 className='text-zinc-50 font-bold text-xl pt-2'>目標コード</h2>
            <div className="flex justify-center items-center bg-zinc-800 rounded-md my-2 py-1 px-8 overflow-x-hidden overflow-y-auto w-4/5">
                <div
                    className={`
                        mx-1 my-3 rounded-md font-medium text-4xl text-zinc-50 bg-zinc-700 py-5 p-10
                        hover:shadow-lg hover:shadow-zinc-500/50 hover:brightness-110
                        transiton duration-200 ease-in-out ${isCorrect ? "brightness-150" : ""}
                    `}
                >
                    {targetChord}
                </div>
                {isCorrect === true ? (<div
                    className="absolute mx-1 my-3 rounded-md font-medium text-4xl text-zinc-50 bg-zinc-700 py-5 px-15"
                >
                    正解
                </div>) : ("")}
            </div>
        </div>
    )
}