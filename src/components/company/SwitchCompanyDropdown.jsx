
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronDown,
  Check,
  Building2,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  companyApi,
} from "../../utils/api";

import useAuthStore from "../../hooks/useAuth";

export default function SwitchCompanyDropdown() {
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
  STATE
  */

  const [companies, setCompanies] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef(null);

  /*
  LOAD COMPANIES
  */

  useEffect(() => {
    if (
      user?.role ===
        "ADMIN" ||

      user?.role ===
        "SUPER_ADMIN"
    ) {
      loadCompanies();
    }
  }, [user]);

  /*
  OUTSIDE CLICK
  */

  useEffect(() => {
    const handleClickOutside =
      (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target
          )
        ) {
          setOpen(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
  FETCH
  */

  const loadCompanies =
    async () => {
      try {
        const res =
          await companyApi.getAll();

        setCompanies(
          res.data.companies || []
        );
      } catch (err) {
        console.error(err);

        toast.error(
          "Failed to load companies"
        );
      }
    };

  /*
  SWITCH COMPANY
  */

  const switchCompany = (
    company
  ) => {
    /*
    SAME COMPANY
    */

    if (
      activeCompany?.id ===
      company.id
    ) {
      setOpen(false);

      return;
    }

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
      `Switched to ${company.name}`
    );

    /*
    CLOSE
    */

    setOpen(false);
  };

  /*
  RBAC
  */

  if (
    user?.role !==
      "ADMIN" &&

    user?.role !==
      "SUPER_ADMIN"
  ) {
    return null;
  }

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          h-11
          px-4

          rounded-2xl

          border
          border-slate-200
          dark:border-slate-800

          bg-white
          dark:bg-slate-900

          flex
          items-center
          gap-3

          shadow-sm

          hover:shadow-md

          transition-all
        "
      >
        <div
          className="
            w-8
            h-8

            rounded-xl

            bg-violet-100
            dark:bg-violet-500/10

            flex
            items-center
            justify-center
          "
        >
          <Building2
            size={16}
            className="
              text-violet-600
            "
          />
        </div>

        <div className="text-left">
          <p
            className="
              text-[11px]
              text-slate-500
              leading-none
            "
          >
            Active Company
          </p>

          <p
            className="
              text-sm
              font-semibold
              text-slate-900
              dark:text-white

              max-w-[160px]

              truncate
            "
          >
            {activeCompany?.name ||
              "Select Company"}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`
            transition-transform

            ${
              open
                ? "rotate-180"
                : ""
            }
          `}
        />
      </button>

      {/* DROPDOWN */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3

            w-[320px]
            max-w-[90vw]

            rounded-3xl

            border
            border-slate-200
            dark:border-slate-800

            bg-white
            dark:bg-slate-950

            shadow-2xl

            p-2

            z-50

            max-h-[420px]
            overflow-y-auto
          "
        >
          {companies.map(
            (company) => {
              const active =
                activeCompany?.id ===
                company.id;

              return (
                <button
                  key={company.id}
                  onClick={() =>
                    switchCompany(
                      company
                    )
                  }
                  className={`
                    w-full

                    flex
                    items-center
                    justify-between

                    px-4
                    py-3

                    rounded-2xl

                    transition-all

                    ${
                      active
                        ? `
                          bg-violet-50
                          dark:bg-violet-500/10
                        `
                        : `
                          hover:bg-slate-100
                          dark:hover:bg-slate-900
                        `
                    }
                  `}
                >
                  <div className="text-left">
                    <h4
                      className="
                        text-sm
                        font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {company.name}
                    </h4>

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

                  {active && (
                    <div
                      className="
                        w-7
                        h-7

                        rounded-full

                        bg-violet-600

                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Check
                        size={14}
                        className="
                          text-white
                        "
                      />
                    </div>
                  )}
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

