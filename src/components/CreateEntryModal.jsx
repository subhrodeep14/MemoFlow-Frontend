import { useEffect, useRef, useState } from "react";
import { X, Loader2, Building2, Search, FileText, Hash, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { entryApi } from "../utils/api";
import useAuthStore from "../hooks/useAuth";
import SlNumberSelector from "./SlNumberSelector";

export default function CreateEntryModal({ open, onClose, selectedDate, onSuccess }) {
  const user = useAuthStore((s) => s.user);
  const activeCompany = useAuthStore((s) => s.activeCompany);

  const [loading, setLoading] = useState(false);
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [showSlSelector, setShowSlSelector] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [purposeSuggestions, setPurposeSuggestions] = useState([]);
  const [showReceiverSuggestions, setShowReceiverSuggestions] = useState(false);
  const [showPurposeSuggestions, setShowPurposeSuggestions] = useState(false);

  const slRef = useRef(null);

  const [form, setForm] = useState({
    slNo: "",
    receiverCompany: "",
    receiverCompanyId: "",
    purpose: "",
    purposeId: "",
    description: "",
  });

  useEffect(() => {
    if (open) loadSlNumbers();
  }, [open]);

  // Close SL selector on outside click
  useEffect(() => {
    const handler = (e) => {
      if (slRef.current && !slRef.current.contains(e.target)) {
        setShowSlSelector(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const loadSlNumbers = async () => {
    try {
      const res = await entryApi.getAvailableSlNumbers();
      setUsedNumbers(res.data.used || []);
    } catch (err) {
      console.error(err);
    }
  };

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const searchCompanies = async (query) => {
    if (!query.trim()) {
      setCompanySuggestions([]);
      setShowReceiverSuggestions(false);
      return;
    }
    try {
      const res = await entryApi.searchCompanies(query);
      const results = res.data.companies || [];
      setCompanySuggestions(results);
      setShowReceiverSuggestions(results.length > 0);
    } catch (err) {
      console.error(err);
    }
  };


const searchPurposes =
  async (query) => {
    /*
    EMPTY
    */

    if (
      !query?.trim()
    ) {
      setPurposeSuggestions(
        []
      );

      setShowPurposeSuggestions(
        false
      );

      return;
    }

    try {
      const res =
        await entryApi.searchPurposes(
          query
        );

      const purposes =
        res.data
          ?.purposes || [];

      /*
      SET
      */

      setPurposeSuggestions(
        purposes
      );

      /*
      SHOW ONLY IF EXISTS
      */

      setShowPurposeSuggestions(
        purposes.length >
          0
      );
    } catch (err) {
      console.error(
        err
      );

      setShowPurposeSuggestions(
        false
      );
    }
  };



  const handleSubmit = async () => {
    if (!form.slNo) return toast.error("Select serial number");
    if ( !form.receiverCompany.trim() ) { return toast.error( "Enter receiver company" ); }
    if ( !form.purpose.trim() ) { return toast.error( "Enter purpose" ); }
    if (!activeCompany && !user?.company) return toast.error("No active company selected");

    try {
      setLoading(true);
    
await entryApi.create({
  slNo: form.slNo,

  receiverCompany:
    form.receiverCompany,

  receiverCompanyId:
    form.receiverCompanyId,

  purpose:
    form.purpose,

  purposeId:
    form.purposeId,

  description:
    form.description,

  date:
    selectedDate,
});


      toast.success("Memo created");
      setForm({ slNo: "", receiverCompany: "", receiverCompanyId: "", purpose: "", purposeId: "", description: "" });
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to create memo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
         className="
  fixed inset-0 z-[100]

  bg-black/40
  backdrop-blur-sm

  flex

  overflow-hidden
"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="
           relative

w-full
h-full

overflow-hidden
              rounded-2xl
              border border-slate-200 dark:border-slate-800
              bg-white dark:bg-slate-950
              shadow-2xl shadow-black/20
              flex flex-col 
            "
          >
            {/* HEADER */}
            <div className="shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Create Memo</h2>
                <p className="text-xs text-slate-400 mt-0.5">Enterprise dispatch workflow</p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* BODY */}
            <div className="flex-1

overflow-y-auto

px-5
py-4

space-y-4

min-h-0">

              {/* SENDER */}
              <div className="flex items-center gap-3 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/5 px-3.5 py-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                  <Building2 size={16} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Sender</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate mt-0.5">
                    {activeCompany?.name || user?.company?.name}
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg shrink-0">
                  {activeCompany?.code || user?.company?.code}
                </span>
              </div>

              {/* SL */}
              <div ref={slRef} className="relative">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Serial Number</label>
                <button
                  onClick={() => setShowSlSelector((p) => !p)}
                  className="
                    w-full h-10 rounded-xl
                    border border-slate-200 dark:border-slate-700
                    bg-slate-50 dark:bg-slate-900
                    px-3 flex items-center justify-between
                    text-sm font-medium text-slate-700 dark:text-slate-200
                    hover:border-indigo-400 transition-colors
                  "
                >
                  <div className="flex items-center gap-2">
                    <Hash size={14} className="text-slate-400" />
                    <span className={form.slNo ? "text-slate-900 dark:text-white" : "text-slate-400"}>
                      {form.slNo || "Select serial number"}
                    </span>
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                <SlNumberSelector
                  open={showSlSelector}
                  usedNumbers={usedNumbers}
                  selected={form.slNo ? Number(form.slNo) : null}
                  onSelect={(number) => {
                    updateField("slNo", String(number).padStart(3, "0"));
                    setShowSlSelector(false);
                  }}
                />
              </div>

              {/* RECEIVER */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Receiver Company</label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    value={form.receiverCompany}
                    onBlur={() => setTimeout(() => setShowReceiverSuggestions(false), 150)}
                  
onChange={(e) => {
  const value =
    e.target.value;

  /*
  VALUE
  */

  updateField(
    "receiverCompany",
    value
  );

  /*
  RESET ID
  */

  updateField(
    "receiverCompanyId",
    null
  );

  /*
  EMPTY
  */

  if (
    !value.trim()
  ) {
    setShowReceiverSuggestions(
      false
    );

    return;
  }

  /*
  SEARCH
  */

  searchCompanies(
    value
  );
}}


                    placeholder="Search existing company..."
                    className="
                      w-full h-10 rounded-xl
                      border border-slate-200 dark:border-slate-700
                      bg-slate-50 dark:bg-slate-900
                      pl-9 pr-3 text-sm
                      outline-none focus:border-indigo-400 dark:focus:border-indigo-500
                      text-slate-900 dark:text-white placeholder:text-slate-400
                      transition-colors
                    "
                  />
                </div>
                {showReceiverSuggestions && companySuggestions.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 mt-1 max-h-44 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl shadow-black/10">
                    {companySuggestions.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => {
                          updateField("receiverCompany", company.name);
                          updateField("receiverCompanyId", company.id);
                          setShowReceiverSuggestions(false);
                        }}
                        className="w-full px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{company.name}</p>
                        <p className="text-xs text-slate-500">{company.code}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* PURPOSE */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Purpose</label>
                <div className="relative">
                  <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    value={form.purpose}
                    onBlur={() => setTimeout(() => setShowPurposeSuggestions(false), 150)}
                  

onChange={(e) => {
  const value =
    e.target.value;

  /*
  VALUE
  */

  updateField(
    "purpose",
    value
  );

  /*
  RESET ID
  */

  updateField(
    "purposeId",
    null
  );

  /*
  EMPTY
  */

  if (
    !value.trim()
  ) {
    setShowPurposeSuggestions(
      false
    );

    return;
  }

  /*
  SEARCH
  */

  searchPurposes(
    value
  );
}}


                    placeholder="Search purpose..."
                    className="
                      w-full h-10 rounded-xl
                      border border-slate-200 dark:border-slate-700
                      bg-slate-50 dark:bg-slate-900
                      pl-9 pr-3 text-sm
                      outline-none focus:border-indigo-400 dark:focus:border-indigo-500
                      text-slate-900 dark:text-white placeholder:text-slate-400
                      transition-colors
                    "
                  />
                </div>
                {showPurposeSuggestions && purposeSuggestions.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 mt-1 max-h-44 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl shadow-black/10">
                    {purposeSuggestions.map((purpose) => (
                      <button
                        key={purpose.id}
                        onClick={() => {
                          updateField("purpose", purpose.name);
                          updateField("purposeId", purpose.id);
                          setShowPurposeSuggestions(false);
                        }}
                        className="w-full px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{purpose.name}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Description <span className="text-slate-400 font-normal">(optional)</span></label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Write memo description..."
                  className="
                    w-full rounded-xl
                    border border-slate-200 dark:border-slate-700
                    bg-slate-50 dark:bg-slate-900
                    p-3 text-sm
                    resize-none outline-none
                    focus:border-indigo-400 dark:focus:border-indigo-500
                    text-slate-900 dark:text-white placeholder:text-slate-400
                    transition-colors
                  "
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="shrink-0 border-t border-slate-100 dark:border-slate-800 px-5 py-3 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="h-9 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="h-9 px-5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-60 transition-colors"
              >
                {loading && <Loader2 size={13} className="animate-spin" />}
                Create Memo
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
