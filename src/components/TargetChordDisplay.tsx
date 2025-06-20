interface Props {
    targetChord: string;
    isCorrect: boolean;
}

export default function TargetChordDisplay({ targetChord, isCorrect }: Props) {
    return (
        <div className="mb-5">
            <h2 className='text-zinc-50 font-bold text-xl'>目標コード</h2>
            <div className="flex justify-center items-center bg-zinc-800 rounded-md my-2 mx-auto overflow-x-hidden overflow-y-auto max-w-4/5">
                <div
                    className={`
                        mx-1 my-3 rounded-md font-medium text-2xl text-zinc-50 bg-zinc-700 py-3 px-5
                        hover:shadow-lg hover:shadow-zinc-500/50 hover:brightness-110
                        transiton duration-200 ease-in-out ${isCorrect ? "brightness-150" : ""}
                    `}
                >
                    {targetChord}
                </div>
                {isCorrect === true ? (<div
                    className="absolute mx-1 my-3 rounded-md font-medium text-2xl text-zinc-50 bg-zinc-700 py-3 px-5"
                >
                    正解
                </div>) : ("")}
                {/* <div
                    className="absolute mx-1 my-3 rounded-md font-medium text-2xl text-zinc-50 bg-zinc-700 py-3 px-5"
                >
                    正解
                </div> */}
            </div>
        </div>
    )
}