import {
  format,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  getDay,
  isSaturday,
  isSunday,
} from "date-fns";

import { motion } from "framer-motion";

import DateCell from "./DateCell";

import {
  formatDateKey,
} from "../../utils/dateHelpers";

/*
──────────────────────────────────────
INDIA HOLIDAYS
──────────────────────────────────────
*/

const HOLIDAYS = [
  "2026-01-26",
  "2026-08-15",
  "2026-10-02",
];

export default function MonthCard({
  month,
  selectedDate,
  usedDates = [],
  onDateClick,
}) {
  /*
  MONTH
  */

  const monthStart =
    startOfMonth(month);

  const monthEnd =
    endOfMonth(month);

  const days =
    eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
    });

  const startDay =
    getDay(monthStart);

  const emptyCells =
    Array.from({
      length: startDay,
    });

  /*
  WEEK
  */

  const weekDays = [
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
  ];

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        rounded-[26px]

        border
        border-slate-200/70
        dark:border-slate-800

        bg-white/80
        dark:bg-slate-950/70

        backdrop-blur-xl

        p-3

        shadow-[0_10px_30px_rgba(0,0,0,0.05)]
      "
    >
      {/* HEADER */}

      <div className="mb-3">
        <h3
          className="
            text-base
            md:text-lg
            font-bold

            text-slate-900
            dark:text-white
          "
        >
          {format(
            month,
            "MMMM yyyy"
          )}
        </h3>
      </div>

      {/* WEEK */}

      <div
        className="
          grid
          grid-cols-7
          gap-1
          mb-2
        "
      >
        {weekDays.map(
          (day, index) => (
            <div
              key={index}
              className="
                h-6

                flex
                items-center
                justify-center

                text-[10px]
                font-bold

                uppercase

                text-slate-400
              "
            >
              {day}
            </div>
          )
        )}
      </div>

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-7
          gap-1
        "
      >
        {emptyCells.map(
          (_, index) => (
            <div
              key={index}
              className="
                h-9
                w-9
              "
            />
          )
        )}

        {days.map((day) => {
          /*
          DATE KEY
          */

          const dayKey =
            formatDateKey(
              day
            );

          /*
          USED
          */

         /*
──────────────────────────────────────
FIX UTC SHIFT
──────────────────────────────────────
*/

const fixedUsedDates =
  usedDates.map((d) => {
    /*
    ADD 1 DAY FIX
    */

    const date =
      new Date(d);

    date.setDate(
      date.getDate()
    );

    return formatDateKey(
      date
    );
  });

const used =
  fixedUsedDates.includes(
    dayKey
  );
          /*
          SELECTED
          */

          const selected =
            selectedDate &&
            formatDateKey(
              selectedDate
            ) === dayKey;

          /*
          WEEKEND
          */

          const weekend =
            isSaturday(day) ||
            isSunday(day);

          /*
          HOLIDAY
          */

          const holiday =
            HOLIDAYS.includes(
              dayKey
            );

          return (
            <DateCell
              key={dayKey}
              day={day}
              used={used}
              selected={
                selected
              }
              weekend={
                weekend
              }
              holiday={
                holiday
              }
              onClick={() =>
                onDateClick(
                  dayKey
                )
              }
            />
          );
        })}
      </div>
    </motion.div>
  );
}