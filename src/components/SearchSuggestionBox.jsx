export default function SearchSuggestionBox({
  open,
  items = [],
  onSelect,
}) {
  if (!open) return null;

  return (
    <div
      className="
        absolute
        top-full
        left-0
        right-0

        mt-2

        z-[9999]

        rounded-2xl

        border
        border-slate-200
        dark:border-slate-700

        bg-white
        dark:bg-slate-900

        shadow-2xl

        overflow-hidden
      "
    >
      <div
        className="
          max-h-[280px]
          overflow-y-auto
          p-2
        "
      >
        {items.length === 0 ? (
          <div
            className="
              p-4

              text-center
              text-sm

              text-slate-400
            "
          >
            No suggestions
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              onMouseDown={() =>
                onSelect(item)
              }
              className="
                w-full

                rounded-xl

                px-4
                py-3

                text-left

                hover:bg-indigo-50
                dark:hover:bg-slate-800

                transition-all
              "
            >
              <p
                className="
                  text-sm
                  font-semibold

                  text-slate-800
                  dark:text-white
                "
              >
                {item.name}
              </p>

              <p
                className="
                  mt-1

                  text-xs

                  text-slate-400
                "
              >
                {item.code}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}