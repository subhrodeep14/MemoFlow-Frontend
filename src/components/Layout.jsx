// src/components/Layout.jsx

import { useEffect, useState } from "react";

import {
  Shield,
  Moon,
  Sun,
  LogOut,
  User,
  Bell,
  Search,
  Menu,
} from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import useAuthStore from "../hooks/useAuth";

export default function Layout({
  children,
  onSearch,
}) {
  const navigate =
    useNavigate();

  const { user, logout } =
    useAuthStore();

  const [isDark, setIsDark] =
    useState(() => {
      return (
        localStorage.getItem(
          "theme"
        ) === "dark"
      );
    });

  const [
    mobileMenu,
    setMobileMenu,
  ] = useState(false);

  /*
   ─────────────────────────────────────
   DARK MODE
   ─────────────────────────────────────
  */

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [isDark]);

  /*
   ─────────────────────────────────────
   LOGOUT
   ─────────────────────────────────────
  */

  const handleLogout =
    async () => {
      try {
        await logout();

        toast.success(
          "Logged out"
        );

        navigate("/login");
      } catch {
        toast.error(
          "Logout failed"
        );
      }
    };

  return (
    <div
      className="
        min-h-screen

        bg-slate-100
        dark:bg-[#020617]

        transition-colors
        duration-300

        overflow-x-hidden
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          fixed
          inset-0

          overflow-hidden

          pointer-events-none
        "
      >
        <div
          className="
            absolute
            top-[-120px]
            left-[-120px]

            w-[300px]
            h-[300px]

            bg-indigo-500/10

            rounded-full

            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-120px]
            right-[-120px]

            w-[300px]
            h-[300px]

            bg-violet-500/10

            rounded-full

            blur-3xl
          "
        />
      </div>

      {/* APP */}

      <div className="relative z-10">
        {/* NAVBAR */}

        <motion.header
          initial={{
            opacity: 0,
            y: -14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            sticky
            top-0
            z-50

            h-[74px]

            border-b
            border-slate-200/70
            dark:border-slate-800/70

            bg-white/70
            dark:bg-slate-950/70

            backdrop-blur-xl
          "
        >
          <div
            className="
              h-full

              px-5
              lg:px-8

              flex
              items-center
              justify-between
            "
          >
            {/* LEFT */}

            <div className="flex items-center gap-4">
              {/* <button 
                onClick={() =>
                  setMobileMenu(
                    !mobileMenu
                  )
                }
                className="
                  lg:hidden

                  w-10
                  h-10

                  rounded-2xl

                  bg-slate-100
                  dark:bg-slate-800

                  flex
                  items-center
                  justify-center
                "
              >
                <Menu
                  size={18}
                  className="
                    text-slate-600
                    dark:text-slate-300
                  "
                />
              </button>*/}

              {/* LOGO */}

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div className="relative">
                  <div
                    className="
                      absolute
                      inset-0

                      bg-indigo-500

                      blur-xl

                      opacity-40
                    "
                  />

                  <div
                    className="
                      relative

                      w-12
                      h-12

                      rounded-2xl

                      bg-gradient-to-br
                      from-indigo-600
                      via-violet-600
                      to-purple-600

                      flex
                      items-center
                      justify-center

                      shadow-lg
                      shadow-indigo-500/30
                    "
                  >
                    <Shield
                      size={20}
                      className="text-white"
                    />
                  </div>
                </div>

                <div>
                  <h1
                    className="
                      text-lg
                      font-bold
                      tracking-tight

                      text-slate-800
                      dark:text-white
                    "
                  >
                    MEMO FLOW 
                  </h1>

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Dispatch Register
                  </p>
                </div>
              </motion.div>
            </div>

            {/* SEARCH */}

            <div
              className="
                hidden
                lg:flex

                flex-1

                max-w-xl

                mx-10
              "
            >
              {/* <button
                onClick={onSearch}
                className="
                  w-full

                  flex
                  items-center
                  gap-3

                  px-4
                  h-12

                  rounded-2xl

                  bg-slate-100
                  dark:bg-slate-900

                  border
                  border-slate-200
                  dark:border-slate-800
                "
              >
                <Search
                  size={16}
                  className="
                    text-slate-400
                  "
                />

                <span
                  className="
                    text-sm
                    text-slate-400
                  "
                >
                  Search memo...
                </span>
              </button> */}
            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-3">
              {/* NOTIFICATION */}

              {/* <button
                className="
                  relative

                  w-11
                  h-11

                  rounded-2xl

                  bg-slate-100
                  dark:bg-slate-800

                  flex
                  items-center
                  justify-center
                "
              >
                <Bell
                  size={18}
                  className="
                    text-slate-600
                    dark:text-slate-300
                  "
                />

                <span
                  className="
                    absolute
                    top-2
                    right-2

                    w-2
                    h-2

                    rounded-full

                    bg-red-500
                  "
                />
              </button> */}

              {/* DARK MODE */}

              <button
                onClick={() =>
                  setIsDark(
                    (v) => !v
                  )
                }
                className="
                  w-11
                  h-11

                  rounded-2xl

                  bg-slate-100
                  dark:bg-slate-800

                  flex
                  items-center
                  justify-center
                "
              >
                {isDark ? (
                  <Sun
                    size={18}
                    className="
                      text-yellow-400
                    "
                  />
                ) : (
                  <Moon
                    size={18}
                    className="
                      text-slate-600
                    "
                  />
                )}
              </button>

              {/* USER */}

              <div
                className="
                  hidden
                  sm:flex

                  items-center
                  gap-3

                  pl-3
                  ml-2

                  border-l
                  border-slate-200
                  dark:border-slate-800
                "
              >
                <div
                  className="
                    w-11
                    h-11

                    rounded-2xl

                    bg-gradient-to-br
                    from-indigo-500
                    to-violet-500

                    flex
                    items-center
                    justify-center
                  "
                >
                  <User
                    size={18}
                    className="text-white"
                  />
                </div>

                <div className="hidden xl:block">
                  <p
                    className="
                      text-sm
                      font-semibold

                      text-slate-700
                      dark:text-slate-200
                    "
                  >
                    {user?.email ||
                      "Admin"}
                  </p>

                  {/* <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Super Admin
                  </p> */}
                </div>
              </div>

              {/* LOGOUT */}

              <button
                onClick={
                  handleLogout
                }
                className="
                  w-11
                  h-11

                  rounded-2xl

                  bg-red-50
                  dark:bg-red-500/10

                  flex
                  items-center
                  justify-center
                "
              >
                <LogOut
                  size={18}
                  className="
                    text-red-500
                  "
                />
              </button>
            </div>
          </div>
        </motion.header>

        {/* MOBILE SEARCH */}

        {/* {mobileMenu && (
          <div className="lg:hidden px-4 pt-4">
            <button
              onClick={onSearch}
              className="
                w-full

                flex
                items-center
                gap-3

                px-4
                h-12

                rounded-2xl

                bg-white
                dark:bg-slate-900

                border
                border-slate-200
                dark:border-slate-800
              "
            >
              <Search
                size={16}
                className="
                  text-slate-400
                "
              />

              <span
                className="
                  text-sm
                  text-slate-400
                "
              >
                Search memos...
              </span>
            </button>
          </div>
        )} */}

        {/* CONTENT */}

        <main
          className="
            p-4
            lg:p-6
          "
        >
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}