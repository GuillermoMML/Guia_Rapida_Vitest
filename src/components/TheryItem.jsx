import { Info } from "lucide-react"
export default function TheoryItem({ item }) {
    return (
        <div className="bg-white border-l-4 border-indigo-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all w-full text-left">
            <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                <Info size={18} className="text-indigo-500" />
                {item.name}
            </h3>

            <p className="text-slate-500 text-sm mb-5 italic text-left">
                {item.usage}
            </p>

            <div className="divide-y divide-slate-100">
                {item.content?.map((c, i) => (
                    <div
                        key={i}
                        className="py-4 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 items-start justify-items-start"
                    >
                        <span className="font-bold text-indigo-600 text-xs md:text-sm uppercase tracking-wider text-left">
                            {c.t}
                        </span>

                        <span className="text-slate-600 text-sm leading-relaxed break-words text-left">
                            {c.d}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}