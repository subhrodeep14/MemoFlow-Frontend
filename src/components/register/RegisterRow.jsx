export default function RegisterRow({
  row,
}) {
  return (
    <tr
      className="
        border-b
        border-slate-100
        dark:border-slate-900

        hover:bg-slate-50
        dark:hover:bg-slate-900/40
      "
    >
      <td className="px-6 py-5">
        {row.slNo}
      </td>

      <td className="px-6 py-5">
        {row.date}
      </td>

      <td className="px-6 py-5">
        {row.memoNumber}
      </td>

      <td className="px-6 py-5">
        {row.receiver}
      </td>

      <td className="px-6 py-5">
        {row.purpose}
      </td>

      <td className="px-6 py-5">
        {row.description}
      </td>

      <td className="px-6 py-5">
        <div className="flex gap-2">
          <button
            className="
              px-4
              py-2

              rounded-xl

              bg-emerald-100

              text-emerald-700

              text-xs
              font-semibold
            "
          >
            View
          </button>

          <button
            className="
              px-4
              py-2

              rounded-xl

              bg-indigo-100

              text-indigo-700

              text-xs
              font-semibold
            "
          >
            Upload
          </button>
        </div>
      </td>
    </tr>
  );
}