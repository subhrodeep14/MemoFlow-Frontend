
import {
  Copy,
  Building2,
  Check,
  Shield,
  Users,
  RefreshCcw,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  companyApi,
} from "../../utils/api";

import useAuthStore from "../../hooks/useAuth";

export default function CompanyCard({
  company,
  refresh,
}) {
  /*
  NAVIGATION
  */

  const navigate =
    useNavigate();

  /*
  AUTH STORE
  */

  const user =
    useAuthStore(
      (s) => s.user
    );

  const activeCompany =
    useAuthStore(
      (s) =>
        s.activeCompany
    );

  const setActiveCompany =
    useAuthStore(
      (s) =>
        s.setActiveCompany
    );

  /*
  COPY
  */

  const [
    copied,
    setCopied,
  ] = useState("");

  /*
  ACTIVE
  */

  const active =
    activeCompany?.id ===
    company.id;

  /*
  COPY CODE
  */

  const copyCode =
    async (
      code,
      type
    ) => {
      try {
        await navigator.clipboard.writeText(
          code
        );

        setCopied(type);

        toast.success(
          `${type} code copied`
        );

        setTimeout(() => {
          setCopied("");
        }, 2000);
      } catch {
        toast.error(
          "Copy failed"
        );
      }
    };

  /*
  SWITCH COMPANY
  */

  const switchCompany =
    () => {
      /*
      GLOBAL STATE
      */

      setActiveCompany({
        id: company.id,

        name:
          company.name,

        code:
          company.code,
      });

      /*
      TOAST
      */

      toast.success(
        `${company.name} activated`
      );

      /*
      NAVIGATE
      */

      navigate("/");
    };

  /*
  REGENERATE ADMIN
  */

  const regenerateAdminCode =
    async () => {
      try {
        await companyApi.regenerateAdminCode(
          company.id
        );

        toast.success(
          "Admin code regenerated"
        );

        refresh?.();
      } catch {
        toast.error(
          "Failed to regenerate"
        );
      }
    };

  /*
  REGENERATE EMPLOYEE
  */

  const regenerateEmployeeCode =
    async () => {
      try {
        await companyApi.regenerateEmployeeCode(
          company.id
        );

        toast.success(
          "Employee code regenerated"
        );

        refresh?.();
      } catch {
        toast.error(
          "Failed to regenerate"
        );
      }
    };

  return (
    <div
      className="
        rounded-[30px]

        border
        border-slate-200/70
        dark:border-slate-800

        bg-white/80
        dark:bg-slate-950/70

        backdrop-blur-xl

        p-5

        shadow-[0_10px_40px_rgba(0,0,0,0.06)]

        overflow-hidden
      "
    >
      {/* TOP */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-gradient-to-br
              from-indigo-600
              to-violet-600

              flex
              items-center
              justify-center

              shrink-0
            "
          >
            <Building2
              size={22}
              className="text-white"
            />
          </div>

          <div className="min-w-0">
            <h3
              className="
                font-bold
                text-slate-900
                dark:text-white

                truncate
              "
            >
              {company.name}
            </h3>

            <p
              className="
                text-xs
                text-slate-500
                mt-1
              "
            >
              {company.code}
            </p>
          </div>
        </div>

        {active && (
          <div
            className="
              px-3
              py-1.5

              rounded-xl

              bg-emerald-50
              dark:bg-emerald-500/10

              text-emerald-700
              dark:text-emerald-300

              text-[11px]
              font-bold

              shrink-0
            "
          >
            ACTIVE
          </div>
        )}
      </div>

      {/* CODES */}

      <div className="space-y-3 mt-5">
        {/* ADMIN */}

        <div
          className="
            rounded-2xl

            border
            border-indigo-100
            dark:border-indigo-500/10

            bg-indigo-50/80
            dark:bg-indigo-500/5

            p-4
          "
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Shield
                  size={15}
                  className="text-indigo-600"
                />

                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    text-indigo-600
                  "
                >
                  Admin Code
                </p>
              </div>

              <h3
                className="
                  mt-2
                  text-lg
                  font-black
                  tracking-widest
                  text-slate-900
                  dark:text-white
                "
              >
                {company.adminCode}
              </h3>
            </div>

            <div className="flex gap-2">
              {user?.role ===
                "SUPER_ADMIN" && (
                <button
                  onClick={
                    regenerateAdminCode
                  }
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-white
                    dark:bg-slate-900

                    border
                    border-slate-200
                    dark:border-slate-700

                    flex
                    items-center
                    justify-center
                  "
                >
                  <RefreshCcw
                    size={16}
                  />
                </button>
              )}

              <button
                onClick={() =>
                  copyCode(
                    company.adminCode,
                    "Admin"
                  )
                }
                className="
                  w-10
                  h-10

                  rounded-xl

                  bg-white
                  dark:bg-slate-900

                  border
                  border-slate-200
                  dark:border-slate-700

                  flex
                  items-center
                  justify-center
                "
              >
                {copied ===
                "Admin" ? (
                  <Check
                    size={16}
                    className="text-emerald-600"
                  />
                ) : (
                  <Copy
                    size={16}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* EMPLOYEE */}

        <div
          className="
            rounded-2xl

            border
            border-emerald-100
            dark:border-emerald-500/10

            bg-emerald-50/80
            dark:bg-emerald-500/5

            p-4
          "
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Users
                  size={15}
                  className="text-emerald-600"
                />

                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    text-emerald-600
                  "
                >
                  Employee Code
                </p>
              </div>

              <h3
                className="
                  mt-2
                  text-lg
                  font-black
                  tracking-widest
                  text-slate-900
                  dark:text-white
                "
              >
                {company.employeeCode}
              </h3>
            </div>

            <div className="flex gap-2">
              <button
                onClick={
                  regenerateEmployeeCode
                }
                className="
                  w-10
                  h-10

                  rounded-xl

                  bg-white
                  dark:bg-slate-900

                  border
                  border-slate-200
                  dark:border-slate-700

                  flex
                  items-center
                  justify-center
                "
              >
                <RefreshCcw
                  size={16}
                />
              </button>

              <button
                onClick={() =>
                  copyCode(
                    company.employeeCode,
                    "Employee"
                  )
                }
                className="
                  w-10
                  h-10

                  rounded-xl

                  bg-white
                  dark:bg-slate-900

                  border
                  border-slate-200
                  dark:border-slate-700

                  flex
                  items-center
                  justify-center
                "
              >
                {copied ===
                "Employee" ? (
                  <Check
                    size={16}
                    className="text-emerald-600"
                  />
                ) : (
                  <Copy
                    size={16}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div
          className="
            rounded-2xl
            p-3
            bg-slate-50
            dark:bg-slate-900
          "
        >
          <p className="text-xs text-slate-500">
            Users
          </p>

          <h3 className="font-bold mt-1">
            {company._count
              ?.users || 0}
          </h3>
        </div>

        <div
          className="
            rounded-2xl
            p-3
            bg-slate-50
            dark:bg-slate-900
          "
        >
          <p className="text-xs text-slate-500">
            Entries
          </p>

          <h3 className="font-bold mt-1">
            {company._count
              ?.sentEntries || 0}
          </h3>
        </div>
      </div>

      {/* ACTION */}

      <button
        onClick={switchCompany}
        className="
          mt-5

          w-full
          h-12

          rounded-2xl

          bg-gradient-to-r
          from-indigo-600
          to-violet-600

          hover:opacity-90

          text-white
          text-sm
          font-semibold

          transition-all
        "
      >
        Open Company Dashboard
      </button>
    </div>
  );
}
