import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  KeyRound,
  Mail,
  User2,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

import useAuthStore from "../hooks/useAuth";

export default function LoginPage() {
  /*
  STATE
  */

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    accessCode,
    setAccessCode,
  ] = useState("");

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    isRegister,
    setIsRegister,
  ] = useState(false);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  /*
  AUTH
  */

  const login =
    useAuthStore(
      (s) => s.login
    );

  const register =
    useAuthStore(
      (s) => s.register
    );

  /*
  NAVIGATE
  */

  const navigate =
    useNavigate();

  /*
  SUBMIT
  */

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !email ||
        !password
      ) {
        return;
      }

      if (
        isRegister &&
        password !==
          confirmPassword
      ) {
        toast.error(
          "Passwords do not match"
        );

        return;
      }

      setIsLoading(true);

      try {
        if (
          isRegister
        ) {
          const data =
            await register({
              email,

              password,

              name: fullName,

              accessCode,
            });

          toast.success(
            "Account created successfully"
          );

          if (
            data.user
              .role ===
            "SUPER_ADMIN"
          ) {
            navigate(
              "/super-admin"
            );
          } else {
            navigate(
              "/dashboard"
            );
          }
        } else {
          const data =
            await login(
              email,
              password
            );

          toast.success(
            "Welcome back"
          );

          if (
            data.user
              .role ===
            "SUPER_ADMIN"
          ) {
            navigate(
              "/super-admin"
            );
          } else {
            navigate(
              "/dashboard"
            );
          }
        }
      } catch (err) {
        toast.error(
          err.response?.data
            ?.error ||
            "Authentication failed"
        );
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-[#020617]

        flex
        items-center
        justify-center

        px-4
        py-10
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          absolute
          inset-0

          overflow-hidden
        "
      >
        <div
          className="
            absolute
            top-[-120px]
            left-[-100px]

            h-[420px]
            w-[420px]

            rounded-full

            bg-violet-600/30

            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-140px]
            right-[-100px]

            h-[420px]
            w-[420px]

            rounded-full

            bg-cyan-500/20

            blur-3xl
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]

            pointer-events-none
          "
        />
      </div>

      {/* CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative

          w-full
          max-w-md

          rounded-[32px]

          border
          border-white/10

          bg-white/5

          backdrop-blur-2xl

          shadow-[0_10px_60px_rgba(0,0,0,0.6)]

          overflow-hidden
        "
      >
        {/* TOP GLOW */}

        <div
          className="
            absolute
            inset-x-0
            top-0

            h-1

            bg-gradient-to-r
            from-violet-500
            via-indigo-500
            to-cyan-400
          "
        />

        <div className="p-8 md:p-10">
          {/* HEADER */}

          <div className="text-center">
            <div
              className="
                mx-auto

                flex
                items-center
                justify-center

                h-16
                w-16

                rounded-3xl

                bg-gradient-to-br
                from-violet-600
                to-indigo-600

                shadow-lg
                shadow-violet-900/40
              "
            >
              <Shield
                size={30}
                className="text-white"
              />
            </div>

            <div className="mt-5">
              <h1
                className="
                  text-4xl
                  font-black

                  tracking-tight

                  text-white
                "
              >
                MemoFlow
              </h1>

              <p
                className="
                  mt-2

                  text-sm

                  text-slate-400
                "
              >
                Secure enterprise
                dispatch &
                workflow platform
              </p>
            </div>

            <div
              className="
                mt-5

                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-violet-500/20

                bg-violet-500/10

                px-4
                py-1.5

                text-xs
                font-semibold

                text-violet-300
              "
            >
              <Sparkles
                size={13}
              />

              {isRegister
                ? "Create your secure account"
                : "Sign in to continue"}
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={
              handleSubmit
            }
            className="mt-8 space-y-5"
          >
            {/* NAME */}

            {isRegister && (
              <div>
                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >
                  Full Name
                </label>

                <div className="relative">
                  <User2
                    size={17}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2

                      text-slate-500
                    "
                  />

                  <input
                    type="text"
                    value={
                      fullName
                    }
                    onChange={(
                      e
                    ) =>
                      setFullName(
                        e.target
                          .value
                      )
                    }
                    placeholder="John Doe"
                    className="
                      h-12
                      w-full

                      rounded-2xl

                      border
                      border-white/10

                      bg-white/5

                      pl-11
                      pr-4

                      text-white

                      outline-none

                      placeholder:text-slate-500

                      focus:border-violet-500
                      focus:ring-2
                      focus:ring-violet-500/20
                    "
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}

            <div>
              <label
                className="
                  mb-2
                  block

                  text-sm
                  font-medium

                  text-slate-300
                "
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2

                    text-slate-500
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(
                    e
                  ) =>
                    setEmail(
                      e.target
                        .value
                    )
                  }
                  placeholder="admin@memoflow.com"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-white/10

                    bg-white/5

                    pl-11
                    pr-4

                    text-white

                    outline-none

                    placeholder:text-slate-500

                    focus:border-violet-500
                    focus:ring-2
                    focus:ring-violet-500/20
                  "
                  required
                />
              </div>
            </div>

            {/* ACCESS CODE */}

            {isRegister && (
              <div>
                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >
                  Company Access Code
                </label>

                <div className="relative">
                  <KeyRound
                    size={17}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2

                      text-slate-500
                    "
                  />

                  <input
                    type="text"
                    value={
                      accessCode
                    }
                    onChange={(
                      e
                    ) =>
                      setAccessCode(
                        e.target.value.toUpperCase()
                      )
                    }
                    placeholder="DHPE-ACCESS"
                    className="
                      h-12
                      w-full

                      rounded-2xl

                      border
                      border-white/10

                      bg-white/5

                      pl-11
                      pr-4

                      uppercase
                      tracking-wider

                      text-white

                      outline-none

                      placeholder:text-slate-500

                      focus:border-violet-500
                      focus:ring-2
                      focus:ring-violet-500/20
                    "
                  />
                </div>
              </div>
            )}

            {/* PASSWORD */}

            <div>
              <label
                className="
                  mb-2
                  block

                  text-sm
                  font-medium

                  text-slate-300
                "
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2

                    text-slate-500
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    password
                  }
                  onChange={(
                    e
                  ) =>
                    setPassword(
                      e.target
                        .value
                    )
                  }
                  placeholder="••••••••"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-white/10

                    bg-white/5

                    pl-11
                    pr-12

                    text-white

                    outline-none

                    placeholder:text-slate-500

                    focus:border-violet-500
                    focus:ring-2
                    focus:ring-violet-500/20
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (
                        v
                      ) => !v
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2

                    text-slate-400
                  "
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}

            {isRegister && (
              <div>
                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >
                  Confirm Password
                </label>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(
                    e
                  ) =>
                    setConfirmPassword(
                      e.target
                        .value
                    )
                  }
                  placeholder="••••••••"
                  className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-white/10

                    bg-white/5

                    px-4

                    text-white

                    outline-none

                    placeholder:text-slate-500

                    focus:border-violet-500
                    focus:ring-2
                    focus:ring-violet-500/20
                  "
                  required
                />
              </div>
            )}

            {/* BUTTON */}

            <motion.button
              whileTap={{
                scale: 0.98,
              }}
              disabled={
                isLoading
              }
              type="submit"
              className="
                mt-2

                flex
                items-center
                justify-center
                gap-2

                h-12
                w-full

                rounded-2xl

                bg-gradient-to-r
                from-violet-600
                to-indigo-600

                text-white

                font-semibold

                shadow-lg
                shadow-violet-900/30

                transition-all

                hover:opacity-95
              "
            >
              {isLoading ? (
                <>
                  <span
                    className="
                      h-4
                      w-4

                      rounded-full

                      border-2
                      border-white
                      border-t-transparent

                      animate-spin
                    "
                  />

                  {isRegister
                    ? "Creating account..."
                    : "Authenticating..."}
                </>
              ) : (
                <>
                  <Lock
                    size={16}
                  />

                  {isRegister
                    ? "Create Account"
                    : "Sign In"}
                </>
              )}
            </motion.button>
          </form>

          {/* SWITCH */}

          <div
            className="
              mt-7

              text-center

              text-sm

              text-slate-400
            "
          >
            {isRegister ? (
              <>
                Already have an
                account?{" "}
                <button
                  onClick={() =>
                    setIsRegister(
                      false
                    )
                  }
                  className="
                    font-semibold

                    text-violet-400

                    hover:text-violet-300
                  "
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don’t have an
                account?{" "}
                <button
                  onClick={() =>
                    setIsRegister(
                      true
                    )
                  }
                  className="
                    font-semibold

                    text-violet-400

                    hover:text-violet-300
                  "
                >
                  Create One
                </button>
              </>
            )}
          </div>

          {/* FOOTER */}

          <div
            className="
              mt-8
              border-t
              border-white/10

              pt-5

              text-center

              text-xs

              text-slate-500
            "
          >
            Protected by enterprise
            grade authentication &
            secure workflow access
          </div>
        </div>
      </motion.div>
    </div>
  );
}