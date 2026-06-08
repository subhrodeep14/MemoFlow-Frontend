
import {
  useEffect,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

import useAuthStore from "./hooks/useAuth";

/*
PAGES
*/
import ImportRegisterPage from "./pages/ImportRegisterPage";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";

import CompanyManagementPage from "./pages/CompanyManagementPage";

/*
──────────────────────────────────────
LOADER
──────────────────────────────────────
*/

function FullScreenLoader() {
  return (
    <div
      className="
        min-h-screen

        flex
        items-center
        justify-center

        bg-slate-50
        dark:bg-slate-950
      "
    >
      <div
        className="
          w-10
          h-10

          rounded-full

          border-[3px]
          border-indigo-600
          border-t-transparent

          animate-spin
        "
      />
    </div>
  );
}

/*
──────────────────────────────────────
PROTECTED
──────────────────────────────────────
*/

function ProtectedRoute({
  children,
}) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuthStore();

  /*
  LOADING
  */

  if (isLoading) {
    return (
      <FullScreenLoader />
    );
  }

  /*
  BLOCK
  */

  if (
    !isAuthenticated
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /*
  OK
  */

  return children;
}

/*
──────────────────────────────────────
PUBLIC
──────────────────────────────────────
*/

function PublicRoute({
  children,
}) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuthStore();

  /*
  WAIT
  */

  if (isLoading) {
    return (
      <FullScreenLoader />
    );
  }

  /*
  REDIRECT
  */

  if (
    isAuthenticated
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  /*
  SHOW
  */

  return children;
}

/*
──────────────────────────────────────
APP
──────────────────────────────────────
*/

export default function App() {
  /*
  INIT
  */

  const initialize =
    useAuthStore(
      (s) => s.initialize
    );

  /*
  LOAD AUTH
  */

  useEffect(() => {
    initialize();
  }, []);

  /*
  UI
  */

  return (
    <BrowserRouter>
      {/* TOASTER */}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,

          style: {
            background:
              "#fff",

            color:
              "#27272a",

            border:
              "1px solid #e4e4e7",

            borderRadius:
              "14px",

            fontSize:
              "13px",

            boxShadow:
              "0 10px 30px rgb(0 0 0 / 0.08)",
          },
        }}
      />

      {/* ROUTES */}

      <Routes>
        {/* LOGIN */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* COMPANY PANEL */}

        <Route
  path="/admin/companies"
  element={
    <ProtectedRoute>
      <CompanyManagementPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/import-register"
  element={
    <ProtectedRoute>
      <ImportRegisterPage />
    </ProtectedRoute>
  }
/>

        {/* ROOT */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

