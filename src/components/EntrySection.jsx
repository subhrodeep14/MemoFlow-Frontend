import {
  useState,
  useEffect,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  safeDate,
} from "../utils/dateHelpers";
import {
  Plus,
  Loader,
} from "lucide-react";

import { format } from "date-fns";

import toast from "react-hot-toast";

import { entryApi } from "../utils/api";

import EntryCard from "./EntryCard";

import CreateEntryModal from "./CreateEntryModal";

export default function EntrySection({
  date,
  refreshKey,
  onChange,
}) {
  /*
   ─────────────────────────────────────
   STATE
   ─────────────────────────────────────
  */

  const [entries, setEntries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);

  /*
   ─────────────────────────────────────
   LOAD ENTRIES
   ─────────────────────────────────────
  */

  useEffect(() => {
    loadEntries();
  }, [date, refreshKey]);

  const loadEntries = async () => {
    try {
      setLoading(true);

      /*
       FIX TIMEZONE ISSUE
      */

  /*
 DATE ALREADY STRING
 DO NOT REFORMAT AGAIN
*/

const dateStr =
  typeof date === "string"
    ? date
    : format(
        date,
        "yyyy-MM-dd"
      );
      /*
       FETCH
      */

      const res =
        await entryApi.getByDate(
          dateStr,
        
        );

      setEntries(
        res.data.entries || []
      );
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to load entries"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   ─────────────────────────────────────
   DELETE
   ─────────────────────────────────────
  */

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this entry?"
        );

      if (!confirmDelete)
        return;

      try {
        await entryApi.delete(
          id
        );

        toast.success(
          "Entry deleted"
        );

        /*
         REFRESH
        */

        await loadEntries();

        onChange?.();
      } catch (err) {
        console.error(err);

        toast.error(
          "Failed to delete entry"
        );
      }
    };

  /*
   ─────────────────────────────────────
   DOWNLOAD
   ─────────────────────────────────────
  */

  const handleDownload = (
    entry
  ) => {
    if (!entry.fileUrl)
      return;

    const link =
      document.createElement(
        "a"
      );

    link.href =
      entry.fileUrl;

    link.download =
      entry.fileName ||
      "document";

    link.target =
      "_blank";

    link.click();
  };

  /*
   ─────────────────────────────────────
   LOADING
   ─────────────────────────────────────
  */

  if (loading) {
    return (
      <div
        className="
          flex
          items-center
          justify-center

          py-16
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Loader
            className="
              w-5
              h-5

              animate-spin

              text-indigo-600
            "
          />

          <span
            className="
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Loading entries...
          </span>
        </div>
      </div>
    );
  }

  /*
   ─────────────────────────────────────
   UI
   ─────────────────────────────────────
  */

  return (
    <div className="space-y-4">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h3
            className="
              text-lg
              font-bold

              text-slate-900
              dark:text-white
            "
          >
            Entries
          </h3>

          <p
            className="
              text-sm

              text-slate-500
              dark:text-slate-400
            "
          >
            {
              entries.length
            }{" "}
            total
          </p>
        </div>

        {/* CREATE */}

        <button
          onClick={() =>
            setShowCreateModal(
              true
            )
          }
          className="
            flex
            items-center
            gap-2

            px-4
            py-2.5

            rounded-xl

            bg-indigo-600
            hover:bg-indigo-700

            text-white

            text-sm
            font-semibold

            transition-all
          "
        >
          <Plus className="w-4 h-4" />

          New Entry
        </button>
      </div>

      {/* LIST */}

      <AnimatePresence mode="popLayout">
        {entries.length >
        0 ? (
          <div className="space-y-3">
            {entries.map(
              (
                entry
              ) => (
                <EntryCard
                  key={
                    entry.id
                  }
                  entry={entry}
                  onDelete={
                    handleDelete
                  }
                  onDownload={
                    handleDownload
                  }
                  onRefresh={async () => {
                    await loadEntries();

                    onChange?.();
                  }}
                />
              )
            )}
          </div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              rounded-3xl

              border
              border-dashed
              border-slate-300
              dark:border-slate-700

              bg-white
              dark:bg-slate-900

              py-16

              text-center
            "
          >
            <p
              className="
                text-slate-500
                dark:text-slate-400

                font-medium
              "
            >
              No entries found
            </p>

            <button
              onClick={() =>
                setShowCreateModal(
                  true
                )
              }
              className="
                mt-4

                text-sm
                font-semibold

                text-indigo-600
                dark:text-indigo-400

                hover:underline
              "
            >
              Create first entry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL */}

      <AnimatePresence>
  {showCreateModal && (
    <CreateEntryModal
      open={showCreateModal}
      selectedDate={date}
      onClose={() =>
        setShowCreateModal(false)
      }
      onSuccess={async () => {
        setShowCreateModal(false);

        await loadEntries();

        onChange?.();

        toast.success(
          "Memo created successfully"
        );
      }}
    />
  )}
</AnimatePresence>
    </div>
  );
}