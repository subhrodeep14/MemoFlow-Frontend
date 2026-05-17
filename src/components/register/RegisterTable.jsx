
import {
  Download,
  FileText,
  Trash2,
  Upload,
  Building2,
  ArrowRight,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import * as XLSX from "xlsx";

import toast from "react-hot-toast";

import {
  entryApi,
} from "../../utils/api";

export default function RegisterTable({
  rows = [],
  lastUsed = 0,
  refreshData,
}) {
  /*
  ─────────────────────────────────────
  EXPORT
  ─────────────────────────────────────
  */

  const handleExport =
    () => {
      const exportRows =
        rows.map(
          (row) => ({
            "SL NO":
              row.slNo,

            DATE:
              row.date ||
              "",

            "MEMO NO":
              row.memoNumber ||
              "",

            FROM:
              row?.entry
                ?.sender
                ?.name ||
              "",

            TO:
              row?.entry
                ?.receiver
                ?.name ||
              "",

            PURPOSE:
              row?.entry
                ?.purpose
                ?.name ||
              "",

            DESCRIPTION:
              row.description ||
              "",
          })
        );

      const worksheet =
        XLSX.utils.json_to_sheet(
          exportRows
        );

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Dispatch Register"
      );

      XLSX.writeFile(
        workbook,
        "dispatch-register.xlsx"
      );
    };

  /*
  ─────────────────────────────────────
  VIEW FILE
  ─────────────────────────────────────
  */

  const handleViewFile =
    (url) => {
      if (!url) return;

      window.open(
        url,
        "_blank"
      );
    };

  /*
  ─────────────────────────────────────
  DELETE FILE
  ─────────────────────────────────────
  */

  const handleDeleteFile =
    async (id) => {
      try {
        await entryApi.deleteFile(
          id
        );

        toast.success(
          "File deleted"
        );

        refreshData?.();
      } catch (err) {
        console.log(err);

        toast.error(
          "Delete failed"
        );
      }
    };

  /*
  ─────────────────────────────────────
  UPLOAD
  ─────────────────────────────────────
  */

  const handleUpload =
    async (
      e,
      entryId
    ) => {
      try {
        const file =
          e.target.files[0];

        if (!file) return;

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        await entryApi.uploadFile(
          entryId,
          formData
        );

        toast.success(
          "File uploaded"
        );

        refreshData?.();
      } catch (err) {
        console.log(err);

        toast.error(
          "Upload failed"
        );
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
      className="
        overflow-hidden

        rounded-[28px]

        border
        border-slate-200/70
        dark:border-slate-800

        bg-white/90
        dark:bg-slate-950/70

        backdrop-blur-xl

        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          lg:flex-row

          lg:items-center
          lg:justify-between

          gap-4

          px-4
          md:px-6

          py-4

          border-b
          border-slate-200
          dark:border-slate-800
        "
      >
        <div>
          <h2
            className="
              text-lg
              md:text-xl

              font-bold

              text-slate-900
              dark:text-white
            "
          >
            Dispatch Register
          </h2>

          <p
            className="
              mt-1

              text-xs
              md:text-sm

              text-slate-500
              dark:text-slate-400
            "
          >
            Enterprise dispatch register
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="
              h-10
              px-4

              rounded-2xl

              bg-gradient-to-r
              from-indigo-500
              to-violet-600

              text-white

              text-xs
              md:text-sm

              font-semibold

              flex
              items-center
            "
          >
            Last Used:
            {" "}
            {String(
              lastUsed
            ).padStart(
              3,
              "0"
            )}
          </div>

          <button
            onClick={
              handleExport
            }
            className="
              h-10
              px-4

              rounded-2xl

              bg-gradient-to-r
              from-indigo-600
              to-violet-600

              text-white

              text-xs
              md:text-sm

              font-semibold

              flex
              items-center
              gap-2

              hover:scale-[1.02]

              transition-all
            "
          >
            <Download
              size={15}
            />

            Export
          </button>
        </div>
      </div>

      {/* MOBILE */}

      <div className="block lg:hidden">
        <div className="p-3 space-y-3">
          {rows.map(
            (
              row,
              index
            ) => (
              <div
                key={
                  row.slNo
                }
                className={`
                  rounded-3xl

                  border

                  p-4

                  ${
                    index %
                      2 ===
                    0
                      ? `
                        bg-white
                        dark:bg-slate-900

                        border-slate-200
                        dark:border-slate-800
                      `
                      : `
                        bg-indigo-100/70
                        dark:bg-slate-900/70

                        border-indigo-200
                        dark:border-slate-800
                      `
                  }
                `}
              >
                {/* TOP */}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="
                        text-lg
                        font-bold

                        text-slate-900
                        dark:text-white
                      "
                    >
                      #
                      {
                        row.slNo
                      }
                    </p>

                    <p
                      className="
                        mt-1

                        text-[11px]
                        font-mono

                        text-indigo-600
                        dark:text-indigo-300

                        break-all
                      "
                    >
                      {
                        row.memoNumber
                      }
                    </p>
                  </div>

                  <div
                    className="
                      px-3
                      py-1

                      rounded-xl

                      bg-slate-100
                      dark:bg-slate-800

                      text-[10px]

                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {
                      row.date
                    }
                  </div>
                </div>

                {/* FLOW */}

                <div className="mt-4 flex items-center gap-2">
                  <div
                    className="
                      flex-1

                      rounded-2xl

                      bg-blue-50
                      dark:bg-blue-500/10

                      p-3
                    "
                  >
                    <div className="flex items-center gap-1">
                      <Building2
                        size={12}
                        className="text-blue-600"
                      />

                      <span
                        className="
                          text-[10px]
                          font-bold

                          text-blue-600
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
                        dark:text-slate-200
                      "
                    >
                      {
                        row
                          ?.entry
                          ?.sender
                          ?.name ||
                          "—"
                      }
                    </p>
                  </div>

                  <ArrowRight
                    size={15}
                    className="text-slate-300"
                  />

                  <div
                    className="
                      flex-1

                      rounded-2xl

                      bg-emerald-50
                      dark:bg-emerald-500/10

                      p-3
                    "
                  >
                    <div className="flex items-center gap-1">
                      <Building2
                        size={12}
                        className="text-emerald-600"
                      />

                      <span
                        className="
                          text-[10px]
                          font-bold

                          text-emerald-600
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
                        dark:text-slate-200
                      "
                    >
                      {
                        row
                          ?.entry
                          ?.receiver
                          ?.name ||
                          "—"
                      }
                    </p>
                  </div>
                </div>

                {/* PURPOSE */}

                <div className="mt-4">
                  <p
                    className="
                      text-[10px]
                      uppercase

                      text-slate-400
                    "
                  >
                    Purpose
                  </p>

                  <p
                    className="
                      mt-1

                      text-sm

                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    {
                      row
                        ?.entry
                        ?.purpose
                        ?.name ||
                        "—"
                    }
                  </p>
                </div>

                {/* DESCRIPTION */}

                <div className="mt-3">
                  <p
                    className="
                      text-[10px]
                      uppercase

                      text-slate-400
                    "
                  >
                    Description
                  </p>

                  <p
                    className="
                      mt-1

                      text-sm

                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    {row.description ||
                      "—"}
                  </p>
                </div>

                {/* FILE */}

                <div className="mt-4 flex gap-2 flex-wrap">
                  {row
                    ?.entry
                    ?.fileUrl ? (
                    <>
                      <button
                        onClick={() =>
                          handleViewFile(
                            row
                              ?.entry
                              ?.fileUrl
                          )
                        }
                        className="
                          h-10
                          px-4

                          rounded-xl

                          bg-emerald-500

                          text-white

                          text-xs
                          font-semibold

                          flex
                          items-center
                          gap-2
                        "
                      >
                        <FileText
                          size={14}
                        />

                        View
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteFile(
                            row
                              ?.entry
                              ?.id
                          )
                        }
                        className="
                          h-10
                          px-4

                          rounded-xl

                          bg-red-500

                          text-white

                          text-xs
                          font-semibold

                          flex
                          items-center
                          gap-2
                        "
                      >
                        <Trash2
                          size={14}
                        />

                        Delete
                      </button>
                    </>
                  ) : (
                    <label
                      className="
                        h-10
                        px-4

                        rounded-xl

                        bg-indigo-600

                        text-white

                        text-xs
                        font-semibold

                        flex
                        items-center
                        gap-2

                        cursor-pointer
                      "
                    >
                      <Upload
                        size={14}
                      />

                      Upload

                      <input
                        type="file"
                        hidden
                        onChange={(
                          e
                        ) =>
                          handleUpload(
                            e,
                            row
                              ?.entry
                              ?.id
                          )
                        }
                      />
                    </label>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* DESKTOP */}

      <div
        className="
          hidden
          lg:block

          overflow-auto
          max-h-[750px]
        "
      >
        <table className="w-full min-w-[1500px]">
          <thead
            className="
              sticky
              top-0
              z-10

              bg-slate-100
              dark:bg-slate-900
            "
          >
            <tr>
              {[
                "SL",
                "DATE",
                "MEMO",
                "FROM",
                "TO",
                "PURPOSE",
                "DESCRIPTION",
                "FILE",
              ].map(
                (
                  head
                ) => (
                  <th
                    key={
                      head
                    }
                    className="
                      px-6
                      py-4

                      text-left

                      text-xs
                      font-bold

                      tracking-wide

                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (
                row,
                index
              ) => (
                <tr
                  key={
                    row.slNo
                  }
                  className={`
                    border-b

                    border-slate-200
                    dark:border-slate-800

                    transition-all

                    ${
                      index %
                        2 ===
                      0
                        ? `
                          bg-white
                          dark:bg-slate-950/30
                        `
                        : `
                          bg-indigo-100/60
                          dark:bg-slate-900/60
                        `
                    }

                    hover:bg-indigo-200/60
                    dark:hover:bg-indigo-500/10
                  `}
                >
                  <td
                    className="
                      px-6
                      py-5

                      font-bold

                      text-slate-800
                      dark:text-slate-200
                    "
                  >
                    {
                      row.slNo
                    }
                  </td>

                  <td className="px-6 py-5 text-sm">
                    {
                      row.date
                    }
                  </td>

                  <td className="px-6 py-5">
                    <div
                      className="
                        inline-flex

                        px-3
                        py-1.5

                        rounded-xl

                        bg-indigo-600

                        text-white

                        text-xs
                        font-semibold
                      "
                    >
                      {
                        row.memoNumber
                      }
                    </div>
                  </td>

                  {/* FROM */}

                  <td className="px-6 py-5">
                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold

                          text-slate-800
                          dark:text-slate-200
                        "
                      >
                        {
                          row
                            ?.entry
                            ?.sender
                            ?.name ||
                            "-"
                        }
                      </p>

                      <p
                        className="
                          text-xs

                          text-slate-400
                        "
                      >
                        {
                          row
                            ?.entry
                            ?.sender
                            ?.code ||
                            "-"
                        }
                      </p>
                    </div>
                  </td>

                  {/* TO */}

                  <td className="px-6 py-5">
                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold

                          text-slate-800
                          dark:text-slate-200
                        "
                      >
                        {
                          row
                            ?.entry
                            ?.receiver
                            ?.name ||
                            "-"
                        }
                      </p>

                      <p
                        className="
                          text-xs

                          text-slate-400
                        "
                      >
                        {
                          row
                            ?.entry
                            ?.receiver
                            ?.code ||
                            "-"
                        }
                      </p>
                    </div>
                  </td>

                  {/* PURPOSE */}

                  <td className="px-6 py-5 text-sm">
                    {
                      row
                        ?.entry
                        ?.purpose
                        ?.name ||
                        "-"
                    }
                  </td>

                  {/* DESCRIPTION */}

                  <td className="px-6 py-5 max-w-[300px]">
                    <div
                      className="
                        text-sm

                        text-slate-600
                        dark:text-slate-400

                        line-clamp-2
                      "
                    >
                      {row.description ||
                        "—"}
                    </div>
                  </td>

                  {/* FILE */}

                  <td className="px-6 py-5">
                    {row.fileUrl ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleViewFile(
                              row.fileUrl
                            )
                          }
                          className="
                            h-10
                            px-4

                            rounded-xl

                            bg-emerald-500

                            text-white

                            text-xs
                            font-semibold

                            flex
                            items-center
                            gap-2
                          "
                        >
                          <FileText
                            size={14}
                          />

                          View
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteFile(
                              row.id
                            )
                          }
                          className="
                            h-10
                            px-4

                            rounded-xl

                            bg-red-500

                            text-white

                            text-xs
                            font-semibold

                            flex
                            items-center
                            gap-2
                          "
                        >
                          <Trash2
                            size={14}
                          />

                          Delete
                        </button>
                      </div>
                    ) : (
                      <label
                        className="
                          h-10
                          px-4

                          rounded-xl

                          bg-indigo-600

                          text-white

                          text-xs
                          font-semibold

                          flex
                          items-center
                          gap-2

                          cursor-pointer

                          w-fit
                        "
                      >
                        <Upload
                          size={14}
                        />

                        Upload

                        <input
                          type="file"
                          hidden
                          onChange={(
                            e
                          ) =>
                            handleUpload(
                              e,
                              row.id
                            )
                          }
                        />
                      </label>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

