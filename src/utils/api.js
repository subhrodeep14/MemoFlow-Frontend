
import axios from "axios";

import useAuthStore from "../hooks/useAuth";

/*
──────────────────────────────────────
AXIOS
──────────────────────────────────────
*/

const api = axios.create({
  baseURL:
    import.meta.env
      .VITE_API_URL ||
    "http://localhost:5001/api",

  withCredentials: true,
});

/*
──────────────────────────────────────
REQUEST INTERCEPTOR
──────────────────────────────────────
*/

api.interceptors.request.use(
  (config) => {
    /*
    TOKEN
    */

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    /*
    ACTIVE COMPANY
    FROM ZUSTAND
    */

    const activeCompany =
      useAuthStore.getState()
        .activeCompany;

    /*
    ADMIN / SUPER ADMIN
    */

    if (
      activeCompany?.id
    ) {
      config.headers[
        "x-company-id"
      ] =
        activeCompany.id;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

/*
──────────────────────────────────────
AUTH
──────────────────────────────────────
*/

export const authApi = {
  login: (data) =>
    api.post(
      "/auth/login",
      data
    ),

  register: (data) =>
    api.post(
      "/auth/register",
      data
    ),

  me: () =>
    api.get("/auth/me"),

  logout: () =>
    api.post(
      "/auth/logout"
    ),
};

/*
──────────────────────────────────────
ENTRY
──────────────────────────────────────
*/

export const entryApi = {
  create: (data) =>
    api.post(
      "/entry/create",
      data
    ),

  getAll: (params) =>
    api.get("/entry", {
      params,
    }),

  search: (params) =>
    api.get(
      "/entry/search",
      {
        params,
      }
    ),

  getByDate: (date) =>
    api.get(
      "/entry/by-date",
      {
        params: {
          date,
        },
      }
    ),

  getAvailableSlNumbers:
    () =>
      api.get(
        "/entry/sl-numbers"
      ),

  searchCompanies: (
    query
  ) =>
    api.get(
      "/entry/companies/search",
      {
        params: {
          q: query,
        },
      }
    ),

  searchPurposes: (
    query
  ) =>
    api.get(
      "/purposes/search",
      {
        params: {
          q: query,
        },
      }
    ),

  uploadFile: (
    id,
    formData
  ) =>
    api.post(
      `/entry/upload-file/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    ),

  deleteFile: (id) =>
    api.delete(
      `/entry/delete-file/${id}`
    ),

  delete: (id) =>
    api.delete(
      `/entry/${id}`
    ),
};

/*
──────────────────────────────────────
COMPANY
──────────────────────────────────────
*/

export const companyApi = {
  getAll: () =>
    api.get("/companies"),

  create: (data) =>
    api.post(
      "/companies/create",
      data
    ),

  search: (query) =>
    api.get(
      "/companies/search",
      {
        params: {
          q: query,
        },
      }
    ),

  regenerateAdminCode: (
    companyId
  ) =>
    api.patch(
      `/companies/${companyId}/regenerate-admin-code`
    ),

  regenerateEmployeeCode: (
    companyId
  ) =>
    api.patch(
      `/companies/${companyId}/regenerate-employee-code`
    ),
};

/*
──────────────────────────────────────
PURPOSE
──────────────────────────────────────
*/

export const purposeApi = {
  getAll: () =>
    api.get("/purposes"),

  create: (data) =>
    api.post(
      "/purposes",
      data
    ),
};

/*
──────────────────────────────────────
MEMO
──────────────────────────────────────
*/

export const memoApi = {
  getAll: (params) =>
    api.get("/memos", {
      params,
    }),

  create: (data) =>
    api.post(
      "/memos/create",
      data
    ),

  search: (params) =>
    api.get(
      "/memos/search",
      {
        params,
      }
    ),

  getByDate: (date) =>
    api.get(
      "/memos/by-date",
      {
        params: {
          date,
        },
      }
    ),
};

/*
──────────────────────────────────────
ACTIVITY
──────────────────────────────────────
*/

export const activityApi = {
  getAll: (params) =>
    api.get(
      "/activities",
      {
        params,
      }
    ),

  create: (data) =>
    api.post(
      "/activities/create",
      data
    ),
};

/*
──────────────────────────────────────
FILES
──────────────────────────────────────
*/

export const fileApi = {
  upload: (formData) =>
    api.post(
      "/files/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    ),

  getAll: () =>
    api.get("/files"),
};

/*
──────────────────────────────────────
CALENDAR
──────────────────────────────────────
*/

export const calendarApi = {
  getAll: () =>
    api.get("/calendar"),
};

/*
──────────────────────────────────────
EXPORT
──────────────────────────────────────
*/

export default api;

