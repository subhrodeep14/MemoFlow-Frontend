import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  KeyRound,
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

      /*
      VALIDATION
      */

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

      /*
      LOADING
      */

      setIsLoading(true);

      try {
        /*
        REGISTER
        */

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

          /*
          REDIRECT
          */

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
          /*
          LOGIN
          */

          const data =
            await login(
              email,
              password
            );

          toast.success(
            "Welcome back"
          );

          /*
          ROLE REDIRECT
          */

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
        min-h-screen

        bg-surface-50

        flex
        items-center
        justify-center

        p-4
      "
    >
      {/* BG */}

      <div
        className="
          absolute
          inset-0

          overflow-hidden

          pointer-events-none
        "
      >
        <div
          className="
            absolute
            top-0
            left-1/4

            w-96
            h-96

            bg-accent-100

            rounded-full

            blur-3xl

            opacity-30
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-1/4

            w-80
            h-80

            bg-blue-50

            rounded-full

            blur-3xl

            opacity-40
          "
        />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="
          relative

          w-full
          max-w-md
        "
      >
        {/* HEADER */}

        <div className="text-center mb-8">
          <div
            className="
              inline-flex
              items-center
              justify-center

              w-14
              h-14

              bg-accent-600

              rounded-2xl

              mb-4

              shadow-lg
            "
          >
            <Shield
              size={24}
              className="text-white"
            />
          </div>

          <h1
            className="
              font-display
              text-3xl

              text-surface-900

              font-light

              mb-1
            "
          >
            MemoFlow
          </h1>

          <p
            className="
              text-sm
              text-surface-400
            "
          >
            {isRegister
              ? "Create company linked account"
              : "Secure business document workflow"}
          </p>
        </div>

        {/* CARD */}

        <div className="card p-8">
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            {/* NAME */}

            {isRegister && (
              <div>
                <label className="label">
                  Full Name
                </label>

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
                  className="input"
                  placeholder="John Doe"
                />
              </div>
            )}

            {/* EMAIL */}

            <div>
              <label className="label">
                Email address
              </label>

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
                className="input"
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </div>

            {/* ACCESS CODE */}

            {isRegister && (
              <div>
                <label className="label">
                  Company Verification Code
                </label>

                <div className="relative">
                  <KeyRound
                    size={16}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2

                      text-surface-400
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
                    className="
                      input
                      pl-10
                    "
                    placeholder="AB12CD"
                  />
                </div>

                <p
                  className="
                    text-xs
                    text-surface-400
                    mt-2
                  "
                >
                  Ask your administrator for the company verification code
                </p>
              </div>
            )}

            {/* PASSWORD */}

            <div>
              <label className="label">
                Password
              </label>

              <div className="relative">
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
                  className="
                    input
                    pr-10
                  "
                  placeholder="••••••••"
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
                    right-3
                    top-1/2
                    -translate-y-1/2

                    text-surface-400
                  "
                >
                  {showPassword ? (
                    <EyeOff
                      size={16}
                    />
                  ) : (
                    <Eye
                      size={16}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM */}

            {isRegister && (
              <div>
                <label className="label">
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
                  className="input"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {/* BUTTON */}

            <motion.button
              type="submit"
              disabled={
                isLoading
              }
              whileTap={{
                scale: 0.98,
              }}
              className="
                w-full

                btn-primary

                justify-center

                py-2.5

                text-base
              "
            >
              {isLoading ? (
                <span
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      w-4
                      h-4

                      border-2
                      border-white
                      border-t-transparent

                      rounded-full

                      animate-spin
                    "
                  />

                  {isRegister
                    ? "Creating account..."
                    : "Authenticating..."}
                </span>
              ) : (
                <>
                  <Lock
                    size={16}
                  />

                  {isRegister
                    ? "Create account"
                    : "Sign in"}
                </>
              )}
            </motion.button>
          </form>

          {/* SWITCH */}

          <div
            className="
              mt-5

              text-center

              text-sm
            "
          >
            {isRegister ? (
              <button
                type="button"
                onClick={() =>
                  setIsRegister(
                    false
                  )
                }
                className="
                  text-accent-600
                "
              >
                Already have an account?
                Sign in
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setIsRegister(
                    true
                  )
                }
                className="
                  text-accent-600
                "
              >
                Create new profile
              </button>
            )}
          </div>

          {/* FOOTER */}

          <div
            className="
              mt-6
              pt-6

              border-t
              border-surface-100

              flex
              items-center
              gap-2

              text-xs
              text-surface-400
            "
          >
            <Shield
              size={12}
            />

            <span>
              Enterprise secure
              document workflow
              system
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}