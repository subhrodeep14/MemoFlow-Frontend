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

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const res = await entryApi.search({ limit: 500 });
      setEntries(res.data.entries || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load entries");
    } finally {
      setLoading(false);
    }
  }, []);

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
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            rounded-xl
            border border-slate-200/70 dark:border-slate-800
            bg-white/90 dark:bg-slate-950/80
            backdrop-blur-xl
            px-4 py-3
            shadow-sm
          "
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">MemoFlow</h1>
              <p className="text-xs text-slate-400 mt-0.5">Enterprise document workflow dashboard</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(isSuperAdmin || isAdmin) && (
                <button
                  onClick={() => navigate("/admin/companies")}
                  className="h-8 px-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <LayoutDashboard size={13} />
                  Company Panel
                </button>
              )}

              <div className="h-8 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                <ShieldCheck size={13} />
                {user?.role?.replace("_", " ")}
              </div>

              {activeCompany && (
                <div className="h-8 px-3 rounded-lg bg-violet-50 dark:bg-violet-500/10 flex items-center gap-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300">
                  <Building2 size={13} />
                  {activeCompany.name}
                </div>
              )}

              <div className="h-8 px-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                <User2 size={13} />
                {user?.name || "User"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* TOP GRID: Calendar + Day Panel */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-3">
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
              onDateClick={(date) => setSelectedDate(date)}
              usedDates={usedDates}
              lastUsed={lastUsed}
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
            onCreate={() => fetchEntries()}
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
