import {
  format,
  isToday,
} from "date-fns";

import { motion } from "framer-motion";

export default function DateCell({
  day,
  used,
  selected,
  weekend,
  holiday,
  onClick,
  count,
}) {
  const today =
    isToday(day);
    const badgeStyle =
  count <= 3
    ? `
      bg-emerald-500
      shadow-emerald-500/30
    `
    : count <= 10
    ? `
      bg-amber-500
      shadow-amber-500/30
    `
    : `
      bg-rose-500
      shadow-rose-500/30
    `;
const memoStyle =
  count <= 2
    ? `
      bg-emerald-50
      dark:bg-emerald-500/10

      border-emerald-200
      dark:border-emerald-500/20
    `
    : count <= 5
    ? `
      bg-emerald-100
      dark:bg-emerald-500/20

      border-emerald-300
      dark:border-emerald-500/40
    `
    : `
      bg-emerald-200
      dark:bg-emerald-500/30

      border-emerald-400
      dark:border-emerald-500/60
    `;
  return (
    <motion.button
      whileHover={{
        scale: 1.06,
      }}
      whileTap={{
        scale: 0.94,
      }}
      onClick={onClick}
      className={`
        relative

        h-9
        w-9

        md:h-10
        md:w-10

        rounded-full

        flex
        items-center
        justify-center

        text-[11px]
        md:text-xs

        font-semibold

        transition-all

        border

        ${
          selected
            ? `
              bg-violet-600
              text-white
              border-violet-500
              shadow-lg
              shadow-violet-500/30
            `
            : today
            ? `
              bg-indigo-600
              text-white
              border-indigo-500
            `
            : holiday
            ? `
              bg-yellow-100
              dark:bg-yellow-500/20

              text-yellow-800
              dark:text-yellow-300

              border-yellow-200
            `
            : weekend
            ? `
              bg-red-50
              dark:bg-red-500/10

              text-red-500
              dark:text-red-300

              border-red-100
              dark:border-red-500/20
            `
          : used
? `
  ${memoStyle}

  text-emerald-700
  dark:text-emerald-300
`
            : `
              bg-white
              dark:bg-slate-900

              text-slate-700
              dark:text-slate-200

              border-slate-200
              dark:border-slate-800
            `
        }
      `}
    >
      {format(day, "d")}
        
{count > 0 &&
  !selected &&
  !today && (
    <div
      className={`
        absolute

        -top-1
        -right-1

        min-w-[18px]
        h-[18px]

        px-1

        rounded-full

        text-white

        text-[9px]
        font-bold

        flex
        items-center
        justify-center

        shadow-md

        border
        border-white
        dark:border-slate-900

        ${badgeStyle}
      `}
    >
      {count > 99
        ? "99+"
        : count}
    </div>
)}
    </motion.button>
  );
}