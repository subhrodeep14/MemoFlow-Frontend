// src/components/EntryCard.jsx

import { useState } from "react";
import EditEntryModal from "./EditEntryModal";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import useAuthStore from "../hooks/useAuth";
import toast from "react-hot-toast";
import {
  Pencil
} from "lucide-react";
import {
  ChevronDown,
ChevronUp,
Building2,
ArrowRight,
FileText,
ImageIcon,
Clock,
Hash,
BadgeCheck,
Trash2,
Upload,
} from "lucide-react";

import {
  formatDateTime,
} from "../utils/dateHelpers";

import { entryApi } from "../utils/api";

const purposeColors = {
  FIN: "bg-blue-100 text-blue-700",
  HR: "bg-emerald-100 text-emerald-700",
  LEG: "bg-rose-100 text-rose-700",
  ADM: "bg-violet-100 text-violet-700",
};

export default function EntryCard({
  entry,
  index = 0,
  onRefresh,
}) {
  const [expanded, setExpanded] =
    useState(false);
  const [
  showEditModal,
  setShowEditModal
] = useState(false);
  const [uploading, setUploading] =
    useState(false);

  const hasFile =
    Boolean(entry.fileUrl);

  const user =
  useAuthStore(
    (state) => state.user
  );
  const isPDF =
    entry.fileMime ===
    "application/pdf";

  const purposeColor =
    purposeColors[
    entry.purpose?.code
    ] ||
    "bg-slate-100 text-slate-700";

  // ─────────────────────────────
  // FILE UPLOAD
  // ─────────────────────────────

  const handleFileUpload =
    async (e) => {
      try {
        const file =
          e.target.files[0];

        if (!file) return;

        setUploading(true);
        
        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        await entryApi.uploadFile(
          entry.id,
          formData
        );
        toast.success(
  "File uploaded"
);
        onRefresh?.();
      } catch (err) {
        console.log(err);

       toast.error("Upload failed")
      } finally {
        setUploading(false);
      }
      e.target.value = null;
    };
  // ─────────────────────────────
  // DELETE FILE
  // ─────────────────────────────
  const handleDeleteFile =
    async () => {
      try {
        await entryApi.deleteFile(
          entry.id
        );
        toast.success(
  "File deleted"
);
        onRefresh?.();
      } catch (err) {
        console.log(err);

        toast.error("Delete failed")
      }
    };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.03,
      }}
      className="
        bg-white
        dark:bg-slate-900
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        overflow-hidden
        shadow-sm
        hover:shadow-lg
        transition-all
      "
    >
      {/* HEADER */}

      <div
        onClick={() =>
          setExpanded((v) => !v)
        }
        className="
          p-4
          cursor-pointer
        "
      >
        {/* TOP */}

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-indigo-100
                flex
                items-center
                justify-center
                flex-shrink-0
              "
            >
              <Hash
                size={18}
                className="text-indigo-600"
              />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[13px]
                  font-bold
                  font-mono
                  text-indigo-700
                  truncate
                "
              >
                {entry.memoNumber}
              </p>

              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span
                  className="
                    text-[10px]
                    px-2
                    py-1
                    rounded-full
                    bg-slate-100
                    text-slate-600
                    font-semibold
                  "
                >
                  SL #{entry.slNo}
                </span>

                <span
                  className={`
                    text-[10px]
                    px-2
                    py-1
                    rounded-full
                    font-semibold
                    ${purposeColor}
                  `}
                >
                  {entry.purpose?.code}
                </span>
              </div>
            </div>
          </div>

          <button
            className="
              w-8
              h-8
              rounded-xl
              hover:bg-slate-100
              flex
              items-center
              justify-center
              transition-all
            "
          >
            {expanded ? (
              <ChevronUp
                size={16}
                className="text-slate-500"
              />
            ) : (
              <ChevronDown
                size={16}
                className="text-slate-500"
              />
            )}
          </button>
        </div>

        {/* COMPANY FLOW */}

        <div className="mt-4 flex items-center gap-2">
          {/* FROM */}

          <div
            className="
              flex-1
              rounded-2xl
              bg-blue-50
              px-3
              py-2
              min-w-0
            "
          >
            <div className="flex items-center gap-2">
              <Building2
                size={13}
                className="text-blue-600"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-blue-700
                  uppercase
                "
              >
                FROM
              </span>
            </div>

            <p
              className="
                mt-1
                text-xs
                font-semibold
                text-slate-800
                truncate
              "
            >
              {
                entry
                  .senderCompany
                  ?.name
              }
            </p>

            <p
              className="
                text-[10px]
                font-mono
                text-slate-500
              "
            >
              {
                entry
                  .senderCompany
                  ?.code
              }
            </p>
          </div>

          <ArrowRight
            size={16}
            className="
              text-slate-300
              flex-shrink-0
            "
          />

          {/* TO */}

          <div
            className="
              flex-1
              rounded-2xl
              bg-emerald-50
              px-3
              py-2
              min-w-0
            "
          >
            <div className="flex items-center gap-2">
              <Building2
                size={13}
                className="text-emerald-600"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-emerald-700
                  uppercase
                "
              >
                TO
              </span>
            </div>

            <p
              className="
                mt-1
                text-xs
                font-semibold
                text-slate-800
                truncate
              "
            >
              {
                entry
                  .receiverCompany
                  ?.name
              }
            </p>

            <p
              className="
                text-[10px]
                font-mono
                text-slate-500
              "
            >
              {
                entry
                  .receiverCompany
                  ?.code
              }
            </p>
          </div>
        </div>
      </div>

      {/* EXPANDED */}

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.22,
            }}
            className="overflow-hidden"
          >
            <div
              className="
                border-t
                border-slate-100
                px-4
                py-4
                space-y-4
              "
            >
              {/* PURPOSE */}

              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-slate-400
                    font-semibold
                    mb-1
                  "
                >
                  Purpose
                </p>

                <p className="text-sm text-slate-700">
                  {
                    entry
                      .purpose
                      ?.name
                  }
                </p>
              </div>

              {/* DESCRIPTION */}

              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-slate-400
                    font-semibold
                    mb-1
                  "
                >
                  Description
                </p>

                <p
                  className="
                    text-sm
                    text-slate-600
                    whitespace-pre-wrap
                    leading-relaxed
                  "
                >
                  {entry.description}
                </p>
              </div>

              {/* DATE */}

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1.5">
                  <Clock
                    size={13}
                    className="text-slate-400"
                  />

                  <span className="text-xs text-slate-500">
                    {formatDateTime(
                      entry.createdAt
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <BadgeCheck
                    size={13}
                    className="text-emerald-500"
                  />

                  <span className="text-xs text-emerald-600 font-medium">
                    Official Memo
                  </span>
                </div>
              </div>

              {/* FILE SECTION */}

             {/* FILE SECTION */}

<div
  className="
    rounded-2xl

    border
    border-slate-200
    dark:border-slate-700

    bg-gradient-to-r
    from-slate-50
    to-indigo-50/50

    dark:from-slate-900
    dark:to-slate-800/50

    p-4
  "
>

  {/* TOP */}

  <div className="flex items-start gap-3">

    {/* ICON */}

    <div
      className={`
        w-11
        h-11

        rounded-2xl

        flex
        items-center
        justify-center

        flex-shrink-0

        ${
          isPDF
            ? "bg-red-100"
            : "bg-blue-100"
        }
      `}
    >
      {isPDF ? (
        <FileText
          size={18}
          className="text-red-600"
        />
      ) : (
        <ImageIcon
          size={18}
          className="text-blue-600"
        />
      )}
    </div>

    {/* FILE INFO */}

    <div className="flex-1 min-w-0">

      <p
        className="
          text-sm
          font-semibold

          text-slate-700
          dark:text-slate-200

          break-all
        "
      >
        {entry.fileName ||
          "No File Uploaded"}
      </p>

      <p
        className="
          mt-1

          text-xs

          text-slate-400
        "
      >
        {hasFile
          ? entry.fileMime
          : "Upload PDF or image"}
      </p>

    </div>
    <button
  onClick={() =>
    setShowEditModal(true)
  }
  className="
    px-3 py-2
    rounded-lg
    bg-amber-500
    text-white
  "
>
  <Pencil size={14} />

  Edit
</button>
  </div>
  

  {/* ACTIONS */}

  <div className="mt-4">

    {hasFile ? (

      <div className="flex flex-wrap gap-2">

        {/* VIEW */}

        <button
          onClick={() => {

            if (
              !entry.fileUrl
            ) return;

            /*
            PDF
            */

            if (
              entry.fileMime ===
              "application/pdf"
            ) {

              const viewerUrl =
                `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(entry.fileUrl)}`;

              window.open(
                viewerUrl,
                "_blank"
              );

              return;
            }

            /*
            IMAGE
            */

            window.open(
              entry.fileUrl,
              "_blank"
            );
          }}

          className="
            h-10
            px-4

            rounded-xl

            bg-emerald-500
            hover:bg-emerald-600

            text-white

            text-xs
            font-semibold

            inline-flex
            items-center
            justify-center
            gap-2

            transition-all
          "
        >
          <FileText size={14} />

          View
        </button>
        <button
  onClick={() =>
    setShowEditModal(true)
  }
  className="
    px-3 py-2
    rounded-lg
    bg-amber-500
    text-white
  "
>
  <Pencil size={14} />

  Edit
</button>

        {/* DELETE */}

        {user?.role ===
          "SUPER_ADMIN" && (

          <button
            onClick={
              handleDeleteFile
            }
            className="
              h-10
              px-4

              rounded-xl

              bg-red-500
              hover:bg-red-600

              text-white

              text-xs
              font-semibold

              inline-flex
              items-center
              justify-center
              gap-2

              transition-all
            "
          >
            <Trash2
              size={14}
            />

            Delete
          </button>
        )}
      </div>

    ) : (

      <label
        className="
          h-10
          min-w-[120px]

          px-4

          rounded-xl

          bg-indigo-600
          hover:bg-indigo-700

          text-white

          text-xs
          font-semibold

          inline-flex
          items-center
          justify-center
          gap-2

          cursor-pointer

          transition-all
        "
      >
        <Upload
          size={14}
        />

        {uploading
          ? "Uploading..."
          : "Upload"}

        <input
          type="file"
          accept=".pdf,image/*"
          hidden
          onChange={
            handleFileUpload
          }
        />
      </label>
    )}
  </div>
</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
  {showEditModal && (
    <EditEntryModal
      open={
        showEditModal
      }
      entry={entry}
      onClose={() =>
        setShowEditModal(
          false
        )
      }
      onSuccess={
        onRefresh
      }
    />
  )}
</AnimatePresence>
    </motion.div>
  );
}