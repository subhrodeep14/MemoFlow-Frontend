import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck, Building2, User2, LayoutDashboard } from "lucide-react";
import { formatDisplayShort } from "../utils/dateHelpers";
import { entryApi } from "../utils/api";
import useAuthStore from "../hooks/useAuth";
import Layout from "../components/Layout";
import DayPanel from "../components/DayPanel";
import SearchModal from "../components/SearchModal";
import CustomCalendar from "../components/calendar/CustomCalendar";
import RegisterTable from "../components/register/RegisterTable";

const today = format(new Date(), "yyyy-MM-dd");

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const activeCompany = useAuthStore((s) => s.activeCompany);

  const [selectedDate, setSelectedDate] = useState(today);
  const [entries, setEntries] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sheetLimit, setSheetLimit] = useState(100);
  const [
  selectedYear,
  setSelectedYear,
] = useState(
  new Date().getFullYear()
);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const res =
  await entryApi.search({
    limit: 500,
    year: selectedYear,
  });
      setEntries(res.data.entries || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load entries");
    } finally {
      setLoading(false);
    }
  }, [selectedYear,
    activeCompany?.id,
    
  ]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const entryMap = new Map();
  entries.forEach((entry) => entryMap.set(Number(entry.slNo), entry));

  const rows = Array.from({ length: sheetLimit }, (_, i) => {
    const sl = i + 1;
    const slNo = String(sl).padStart(3, "0");
    const existing = entryMap.get(sl);

    return {
      slNo,
      date: existing ? formatDisplayShort(existing.date) : "",
      memoNumber: existing?.memoNumber || "",
      receiver:
        typeof existing?.receiver === "object"
          ? existing?.receiver?.name || ""
          : existing?.receiver || "",
      sender:
        typeof existing?.sender === "object"
          ? existing?.sender?.name || ""
          : existing?.sender || "",
      purpose:
        typeof existing?.purpose === "object"
          ? existing?.purpose?.name || ""
          : existing?.purpose || "",
      description: existing?.description || "",
      fileUrl: existing?.fileUrl || "",
      entry: existing || null,
    };
  });

  const loadRegisterSettings =
  async () => {
    try {
      const res =
        await entryApi.getRegisterSettings(
          selectedYear
        );

      setSheetLimit(
        res.data.totalRows
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
  loadRegisterSettings();
}, [selectedYear]);
  const usedDates = entries.map((e) => e.date);
  const lastUsed =
    entries.length > 0
      ? Math.max(...entries.map((e) => Number(e.slNo) || 0))
      : 0;

  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const isAdmin = user?.role === "ADMIN";

  return (
    <Layout onSearch={() => setShowSearch(true)}>
      <div className="flex flex-col gap-3 min-h-0">

        {/* HEADER */}
      {/* MOBILE / TABLET HEADER */}

<div className="block xl:hidden">
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="
      rounded-xl

      border
      border-slate-200/70
      dark:border-slate-800

      bg-white/90
      dark:bg-slate-950/80

      backdrop-blur-xl

      p-3

      shadow-sm
    "
  >
    <div className="flex flex-wrap gap-2">

      {activeCompany && (
        <div
          className="
            h-10
            px-3

            rounded-xl

            bg-emerald-50
            dark:bg-emerald-500/10

            flex
            items-center
            gap-2

            text-xs
            font-semibold

            text-emerald-700
            dark:text-emerald-300
          "
        >
          <Building2 size={14} />

          <span className="max-w-[140px] truncate">
            {activeCompany.name}
          </span>
        </div>
      )}

      <div
        className="
          h-10
          px-3

          rounded-xl

          bg-violet-50
          dark:bg-violet-500/10

          flex
          items-center
          gap-2

          text-xs
          font-semibold

          text-violet-700
          dark:text-violet-300
        "
      >
        <ShieldCheck size={14} />

        {user?.role?.replace(
          "_",
          " "
        )}
      </div>

      <div
        className="
          h-10
          px-3

          rounded-xl

          bg-amber-50
          dark:bg-amber-500/10

          flex
          items-center
          gap-2

          text-xs
          font-semibold

          text-amber-700
          dark:text-amber-300
        "
      >
        <User2 size={14} />

        {user?.name}
      </div>

      {(isAdmin ||
        isSuperAdmin) && (
        <button
          onClick={() =>
            navigate(
              "/admin/companies"
            )
          }
          className="
            h-10
            px-4

            rounded-xl

            bg-gradient-to-r
            from-indigo-600
            to-violet-600

            text-white

            text-xs
            font-semibold

            flex
            items-center
            gap-2
          "
        >
          <LayoutDashboard
            size={14}
          />

          Company Panel
        </button>
      )}
    </div>
  </motion.div>
</div>

        {/* TOP GRID: Calendar + Day Panel */}
       <div className="grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-3 justify-between">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="
              rounded-xl
              border border-slate-200/70 dark:border-slate-800
              bg-white/90 dark:bg-slate-950/80
              backdrop-blur-xl
              p-2.5
              shadow-sm
              min-h-0
            "
          >
            <CustomCalendar
  selectedDate={selectedDate}
  onDateClick={(date) =>
    setSelectedDate(date)
  }
  usedDates={usedDates}
  lastUsed={lastUsed}
  onYearChange={
    setSelectedYear
  }
/>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.2 }}
            className="min-h-0"
          >
            <DayPanel
              date={selectedDate}
              onClose={() => setSelectedDate(today)}
              onChange={() => fetchEntries()}
            />
          </motion.div>
        </div>

        {/* REGISTER TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <RegisterTable
  rows={rows}
  lastUsed={lastUsed}
  currentUser={user}
  loading={loading}
  refreshData={fetchEntries}
  selectedYear={selectedYear}
  onRowsIncreased={
    loadRegisterSettings
  }
/>
        </motion.div>

        {/* SEARCH MODAL */}
        <AnimatePresence>
          {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
