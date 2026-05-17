export default function EmptyRegisterRow({
  row,
  onCreate,
}) {
  return (
    <tr
      className="
        border-b
        border-slate-100
        dark:border-slate-900

        bg-slate-50/40
        dark:bg-slate-900/20
      "
    >
      <td className="px-6 py-5">
        {row.slNo}
      </td>

      <td
        colSpan={5}
        className="
          px-6
          py-5

          text-slate-400
        "
      >
        Empty Serial Slot
      </td>

      <td className="px-6 py-5">
        <button
          onClick={() =>
            onCreate(row.slNo)
          }
          className="
            px-4
            py-2

            rounded-xl

            bg-indigo-600
            hover:bg-indigo-700

            text-white

            text-xs
            font-semibold
          "
        >
          Create Memo
        </button>
      </td>
    </tr>
  );
}