
import { create } from "zustand";

import {
  authApi,
} from "../utils/api";

const useAuthStore = create(
  (set, get) => ({
    /*
    AUTH
    */

    user: null,

    isLoading: true,

    isAuthenticated: false,

    /*
    ACTIVE COMPANY
    GLOBAL STATE
    */

    activeCompany: null,

    /*
    SET ACTIVE COMPANY
    */

    setActiveCompany: (
      company
    ) => {
      set({
        activeCompany:
          company,
      });
    },

    /*
    INITIALIZE
    */

    initialize: async () => {
      try {
        /*
        API
        */

        const res =
          await authApi.me();

        const user =
          res.data.user;

        /*
        DEFAULT COMPANY
        ONLY FOR EMPLOYEE
        */

        let activeCompany =
          null;

        if (
          user?.company
        ) {
          activeCompany = {
            id: user.company.id,

            name:
              user.company.name,

            code:
              user.company.code,
          };
        }

        /*
        SET STATE
        */

        set({
          user,

          activeCompany,

          isAuthenticated: true,

          isLoading: false,
        });
      } catch (err) {
        console.error(
          "AUTH INIT ERROR:",
          err
        );

        /*
        CLEAR TOKEN
        */

        localStorage.removeItem(
          "token"
        );

        /*
        RESET
        */

        set({
          user: null,

          activeCompany: null,

          isAuthenticated: false,

          isLoading: false,
        });
      }
    },

    /*
    LOGIN
    */

    login: async (
      email,
      password
    ) => {
      /*
      API
      */

      const res =
        await authApi.login({
          email,
          password,
        });

      const {
        token,
        user,
      } = res.data;

      /*
      TOKEN
      */

      if (token) {
        localStorage.setItem(
          "token",
          token
        );
      }

      /*
      DEFAULT COMPANY
      */

      let activeCompany =
        null;

      /*
      EMPLOYEE
      */

      if (
        user?.company
      ) {
        activeCompany = {
          id: user.company.id,

          name:
            user.company.name,

          code:
            user.company.code,
        };
      }

      /*
      SET
      */

      set({
        user,

        activeCompany,

        isAuthenticated: true,

        isLoading: false,
      });

      return res.data;
    },

    /*
    LOGOUT
    */

    logout: async () => {
      try {
        await authApi.logout();
      } catch {}

      /*
      TOKEN
      */

      localStorage.removeItem(
        "token"
      );

      /*
      RESET
      */

      set({
        user: null,

        activeCompany: null,

        isAuthenticated: false,

        isLoading: false,
      });
    },
  })
);

export default useAuthStore;
