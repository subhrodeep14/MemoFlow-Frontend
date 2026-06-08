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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

import MonthCard from "./MonthCard";

export default function CustomCalendar({
  selectedDate,
  onDateClick,
  usedDates = [],
  lastUsed ,
  onYearChange,
}) {
  /*
   ─────────────────────────────────────
   CURRENT MONTH
   ─────────────────────────────────────
  */

  const [currentMonth, setCurrentMonth] =
  useState(new Date());

const [showPicker, setShowPicker] =
  useState(false);

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
            onClick={() => {
  const newMonth =
    subMonths(
      currentMonth,
      1
    );

  setCurrentMonth(
    newMonth
  );

  onYearChange?.(
    newMonth.getFullYear()
  );
}}
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

          {/* MONTH / YEAR PICKER */}

<div className="relative">

  <button
    onClick={() =>
      setShowPicker(
        !showPicker
      )
    }
    className="
      px-5
      h-11

      rounded-2xl

      bg-indigo-600

      text-white

      flex
      items-center
      gap-2

      text-sm
      font-semibold

      shadow-lg
      shadow-indigo-500/20
    "
  >
    <CalendarDays
      size={16}
    />

    {format(
      currentMonth,
      "MMM yyyy"
    )}
  </button>

  {showPicker && (
  <div
    className="
      absolute
      top-14
      right-0

      z-[9999]

      rounded-2xl

      overflow-hidden

      border
      border-slate-700

      bg-slate-900

      shadow-2xl
    "
  >
    <DatePicker
      inline
      selected={
        selectedDate
          ? new Date(
              selectedDate
            )
          : new Date()
      }
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      onChange={(date) => {
        if (!date) return;

       setCurrentMonth(date);

onYearChange?.(
  date.getFullYear()
);

onDateClick(date);

setShowPicker(false);
      }}
    />
  </div>
)}
</div>

          {/* NEXT */}

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
      onClick={() => {
  const newMonth =
    addMonths(
      currentMonth,
      1
    );

  setCurrentMonth(
    newMonth
  );

  onYearChange?.(
    newMonth.getFullYear()
  );
}}
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