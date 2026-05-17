import {
  addMonths,
  subMonths,
  format,
} from "date-fns";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import { useState } from "react";

import { motion } from "framer-motion";

import MonthCard from "./MonthCard";

export default function CustomCalendar({
  selectedDate,
  onDateClick,
  usedDates = [],
  lastUsed ,
}) {
  /*
   ─────────────────────────────────────
   CURRENT MONTH
   ─────────────────────────────────────
  */

  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  /*
   ─────────────────────────────────────
   3 MONTHS
   ─────────────────────────────────────
  */

  const months = [
    subMonths(currentMonth, 1),
    currentMonth,
    addMonths(currentMonth, 1),
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          xl:flex-row

          xl:items-center
          xl:justify-between

          gap-4
        "
      >
        {/* LEFT */}

        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                w-12
                h-12

                rounded-2xl

                bg-indigo-600

                flex
                items-center
                justify-center

                shadow-lg
                shadow-indigo-500/20
              "
            >
              <CalendarDays
                size={22}
                className="text-white"
              />
            </div>

            <div>
              <h2
                className="
                  text-2xl
                  font-bold
                  tracking-tight

                  text-slate-900
                  dark:text-white
                "
              >
                Dispatch Register
              </h2>

              <p
                className="
                  mt-1
                  text-sm

                  text-slate-500
                  dark:text-slate-400
                "
              >
                Click a date to create memo
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex flex-wrap items-center gap-3">
          {/* LAST SL */}

          <div
            className="
              px-4
              h-11

              rounded-2xl

              bg-emerald-50
              dark:bg-emerald-500/10

              text-emerald-700
              dark:text-emerald-300

              flex
              items-center

              text-sm
              font-semibold
            "
          >
            Last SL:
            {" "}
            {String(lastUsed).padStart(
              3,
              "0"
            )}
          </div>

          {/* PREV */}

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setCurrentMonth(
                subMonths(
                  currentMonth,
                  1
                )
              )
            }
            className="
              w-11
              h-11

              rounded-2xl

              border
              border-slate-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-900

              flex
              items-center
              justify-center

              hover:border-indigo-300
              dark:hover:border-indigo-500

              transition-all
            "
          >
            <ChevronLeft
              size={18}
            />
          </motion.button>

          {/* YEAR */}

          <div
            className="
              px-5
              h-11

              rounded-2xl

              bg-indigo-600

              text-white

              flex
              items-center

              text-sm
              font-semibold

              shadow-lg
              shadow-indigo-500/20
            "
          >
            {format(
              currentMonth,
              "yyyy"
            )}
          </div>

          {/* NEXT */}

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setCurrentMonth(
                addMonths(
                  currentMonth,
                  1
                )
              )
            }
            className="
              w-11
              h-11

              rounded-2xl

              border
              border-slate-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-900

              flex
              items-center
              justify-center

              hover:border-indigo-300
              dark:hover:border-indigo-500

              transition-all
            "
          >
            <ChevronRight
              size={18}
            />
          </motion.button>
        </div>
      </div>

      {/* MONTHS */}

      <div
  className="
    flex
    gap-4

    overflow-x-auto
    pb-2

    snap-x
    snap-mandatory

    xl:grid
    xl:grid-cols-3
    xl:overflow-visible
  "
>
        {months.map(
  (month, index) => (
    <div
      key={index}
      className="
        min-w-[280px]
        snap-center

        xl:min-w-0
      "
    >
      <MonthCard
        month={month}
        selectedDate={
          selectedDate
        }
        usedDates={
          usedDates
        }
        onDateClick={
          onDateClick
        }
      />
    </div>
  )
)}
      </div>
    </div>
  );
}