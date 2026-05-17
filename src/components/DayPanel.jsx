import { useMemo } from "react";

import {
  X,
  Lock,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  formatDisplayShort,
  isLocked,
} from "../utils/dateHelpers";

import EntrySection from "./EntrySection";

export default function DayPanel({
  date,
  onClose,
  onChange,
}) {
  /*
  ─────────────────────────────────────
  LOCKED
  ─────────────────────────────────────
  */

  const locked = useMemo(
    () => isLocked(date),
    [date]
  );

  /*
  ─────────────────────────────────────
  UI
  ─────────────────────────────────────
  */

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 20,
      }}
      transition={{
        duration: 0.2,
      }}
   className="
  relative

  flex
  flex-col

  h-full
  min-h-[420px]
  max-h-[78vh]

  overflow-hidden

  rounded-[24px]
  md:rounded-[28px]

  border
  border-slate-200/70
  dark:border-slate-800

  bg-white/90
  dark:bg-slate-950/80

  backdrop-blur-xl

  shadow-[0_10px_40px_rgba(0,0,0,0.08)]
"
    >
      {/* HEADER */}

      <div
        className="
          px-4
          pt-4
          pb-3

          border-b
          border-slate-100
          dark:border-slate-800

          flex-shrink-0

          bg-white/80
          dark:bg-slate-950/60

          backdrop-blur-xl
        "
      >
        <div className="flex items-start justify-between gap-3">
          {/* LEFT */}

          <div className="flex items-start gap-3">
            {/* ICON */}

            <div
              className="
                w-11
                h-11

                rounded-2xl

                bg-gradient-to-br
                from-indigo-500
                to-violet-600

                flex
                items-center
                justify-center

                shadow-lg
                shadow-indigo-500/20
              "
            >
              <CalendarDays
                size={20}
                className="text-white"
              />
            </div>

            {/* TEXT */}

            <div>
              <h2
                className="
                  text-base
md:text-lg

                  font-bold
                  tracking-tight

                  text-slate-900
                  dark:text-white
                "
              >
                {formatDisplayShort(
                  date
                )}
              </h2>

              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {locked ? (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1

                      px-2.5
                      py-1

                      rounded-full

                      text-[10px]
                      font-semibold

                      bg-amber-100
                      dark:bg-amber-500/15

                      text-amber-700
                      dark:text-amber-300
                    "
                  >
                    <Lock
                      size={10}
                    />

                    Locked
                  </span>
                ) : (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1

                      px-2.5
                      py-1

                      rounded-full

                      text-[10px]
                      font-semibold

                      bg-emerald-100
                      dark:bg-emerald-500/15

                      text-emerald-700
                      dark:text-emerald-300
                    "
                  >
                    <ShieldCheck
                      size={10}
                    />

                    Editable
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* CLOSE */}

          <button
            onClick={onClose}
            className="
              w-9
              h-9

              rounded-xl

              flex
              items-center
              justify-center

              text-slate-400
              dark:text-slate-500

              hover:text-red-500
              dark:hover:text-red-400

              hover:bg-red-50
              dark:hover:bg-red-500/10

              transition-all
            "
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          flex-1

          overflow-y-auto

          bg-slate-50/80
          dark:bg-slate-900/40
        "
      >
        <div className="p-2.5 md:p-4">
          <EntrySection
            date={date}
            onChange={onChange}
          />
        </div>
      </div>
    </motion.div>
  );
}