import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SlNumberSelector({
  open,
  usedNumbers = [],
  selected,
  onSelect,
  onClose,
}) {
  const [limit, setLimit] = useState(100);

  const numbers = useMemo(
    () => Array.from({ length: limit }, (_, i) => i + 1),
    [limit]
  );

  if (!open) return null;

  return (
    <div
      className="
        absolute z-50 left-0 right-0
        mt-1
        rounded-xl
        border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-900
        shadow-xl shadow-black/10
        overflow-hidden
      "
    >
      <div className="max-h-48 overflow-y-auto p-2 overscroll-contain">
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 gap-1.5">
          {numbers.map((num) => {
            const used = usedNumbers.includes(num);
            const isSelected = selected === num;
            return (
              <button
                key={num}
                disabled={used}
                onClick={() => {
                  onSelect(num);
                }}
                className={`
                  h-8 rounded-lg text-[11px] font-semibold transition-all
                  ${used
                    ? "bg-red-50 dark:bg-red-500/10 text-red-400 cursor-not-allowed line-through"
                    : isSelected
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-500 hover:text-white"
                  }
                `}
              >
                {String(num).padStart(3, "0")}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => setLimit((p) => p + 100)}
        className="
          w-full h-8 border-t border-slate-100 dark:border-slate-800
          bg-slate-50 dark:bg-slate-950
          text-xs font-semibold text-indigo-600 dark:text-indigo-400
          flex items-center justify-center gap-1.5
          hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors
        "
      >
        <ChevronDown size={12} />
        Load 100 More
      </button>
    </div>
  );
}
