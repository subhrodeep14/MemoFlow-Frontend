import {
  Search,
  Download,
} from 'lucide-react';

export default function RegisterToolbar({
  totalMemo = 0,
  emptyGap = 0,
}) {
  return (
    <div
      className="
        flex
        flex-col
        xl:flex-row

        gap-4

        xl:items-center
        xl:justify-between

        rounded-[32px]

        border
        border-slate-200/70
        dark:border-slate-800

        bg-white/80
        dark:bg-slate-950/70

        backdrop-blur-xl

        p-5

        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
      "
    >
      {/* SEARCH */}

      <div
        className="
          relative

          w-full
          xl:w-[350px]
        "
      >
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            text-slate-400
          "
        />

        <input
          placeholder="Search memo..."
          className="
            w-full
            h-12

            rounded-2xl

            border
            border-slate-200
            dark:border-slate-700

            bg-white
            dark:bg-slate-900

            pl-11
            pr-4

            text-sm
          "
        />
      </div>

      {/* RIGHT */}

      <div
  className="
    flex
    flex-wrap
    gap-3
  "
>
  <div
    className="
      h-12
      px-5

      rounded-2xl

      bg-gradient-to-r
      from-indigo-500
      to-violet-600

      text-white

      text-sm
      font-semibold

      flex
      items-center

      shadow-lg
      shadow-indigo-500/20
    "
  >
    2026 Register
  </div>

  <div
    className="
      h-12
      px-5

      rounded-2xl

      bg-emerald-100
      dark:bg-emerald-500/10

      text-emerald-700
      dark:text-emerald-300

      text-sm
      font-semibold

      flex
      items-center
    "
  >
    Total Memo:
    {" "}
    {totalMemo}
  </div>

  <div
    className="
      h-12
      px-5

      rounded-2xl

      bg-amber-100
      dark:bg-amber-500/10

      text-amber-700
      dark:text-amber-300

      text-sm
      font-semibold

      flex
      items-center
    "
  >
    Empty Gap:
    {" "}
    {emptyGap}
  </div>

  <button
    className="
      h-12
      px-5

      rounded-2xl

      bg-gradient-to-r
      from-indigo-600
      to-violet-600

      hover:scale-[1.02]

      text-white
      text-sm
      font-semibold

      flex
      items-center
      gap-2

      transition-all

      shadow-lg
      shadow-indigo-500/20
    "
  >
    <Download size={16} />

    Export Excel
  </button>
</div>
    </div>
  );
}