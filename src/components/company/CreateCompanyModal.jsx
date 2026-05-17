// src/components/company/CreateCompanyModal.jsx


import {
  useState,
} from "react";

import {
  X,
  Loader2,
  Building2,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import toast from "react-hot-toast";

import {
  companyApi,
} from "../../utils/api";

export default function CreateCompanyModal({
  onClose,
  onSuccess,
}) {
  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {
    if (!name) {
      toast.error(
        "Company name required"
      );

      return;
    }

    try {
      setLoading(true);

      await companyApi.create({
        name,
      });

      toast.success(
        "Company created successfully"
      );

      onSuccess?.();
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Failed to create company"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        bg-black/50
        backdrop-blur-sm

        flex
        items-center
        justify-center

        p-4
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
          w-full
          max-w-md

          rounded-[28px]

          border
          border-slate-200
          dark:border-slate-800

          bg-white
          dark:bg-slate-950

          overflow-hidden
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between

            px-5
            py-4

            border-b
            border-slate-200
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-11
                h-11

                rounded-2xl

                bg-gradient-to-br
                from-indigo-600
                to-violet-600

                flex
                items-center
                justify-center
              "
            >
              <Building2
                size={20}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Create Company
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Generate company & verification code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              w-9
              h-9

              rounded-xl

              hover:bg-red-50

              flex
              items-center
              justify-center
            "
          >
            <X size={17} />
          </button>
        </div>

        {/* BODY */}

        <div className="p-5 space-y-4">
          <div>
            <label
              className="
                text-xs
                font-semibold

                text-slate-600
              "
            >
              Company Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="State Bank Of India Rahara"
              className="
                w-full
                h-12

                mt-2

                rounded-2xl

                border
                border-slate-200
                dark:border-slate-700

                bg-white
                dark:bg-slate-900

                px-4

                text-sm

                outline-none
              "
            />
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            justify-end
            gap-3

            px-5
            py-4

            border-t
            border-slate-200
            dark:border-slate-800
          "
        >
          <button
            onClick={onClose}
            className="
              h-11
              px-5

              rounded-2xl

              border
              border-slate-200
            "
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="
              h-11
              px-5

              rounded-2xl

              bg-gradient-to-r
              from-indigo-600
              to-violet-600

              text-white
              text-sm
              font-semibold

              flex
              items-center
              gap-2
            "
          >
            {loading && (
              <Loader2
                size={16}
                className="animate-spin"
              />
            )}

            Create Company
          </button>
        </div>
      </motion.div>
    </div>
  );
}
