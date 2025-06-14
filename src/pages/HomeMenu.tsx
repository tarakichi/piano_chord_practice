import { Link } from "react-router-dom";

export default function HomeMenu() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-zinc-50">メニュー</h1>
            <Link to="/viewer" className="mb-4 px-6 py-2 bg-indigo-500 text-zinc-50 rounded">
                コード表示
            </Link>
            <Link to="/practice" className="mb-4 px-6 py-2 bg-indigo-500 text-zinc-50 rounded">
                コード練習
            </Link>
        </div>
    )
}