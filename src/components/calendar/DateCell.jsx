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
}) {
  const today =
    isToday(day);

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
              bg-emerald-50
              dark:bg-emerald-500/10

              text-emerald-700
              dark:text-emerald-300

              border-emerald-200
              dark:border-emerald-500/20
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
        
      {used &&
        !selected &&
        !today && (
          <span
            className="
              absolute
              bottom-1
              right-1

              w-1.5
              h-1.5

              rounded-full

              bg-emerald-500
            "
          />
        )}
    </motion.button>
  );
}