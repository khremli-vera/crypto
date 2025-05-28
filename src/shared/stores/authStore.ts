import { create } from "zustand";

interface AuthStore {
   isAuthenticated: boolean;
   userEmail: string | null;
   login: (email: string, password: string) => boolean;
   logout: () => void;
   initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
   isAuthenticated: false,
   userEmail: null,

   login: (email, password) => {
      if (email === "test@example.com" && password === "123") {
         set({ isAuthenticated: true, userEmail: email });
         localStorage.setItem(
            "auth",
            JSON.stringify({ isAuthenticated: true, userEmail: email })
         );
         return true;
      }
      return false;
   },
   logout: () => {
      localStorage.removeItem("auth");
      set({ isAuthenticated: false, userEmail: null });
   },

   initialize: () => {
      const authData = localStorage.getItem("auth");
      if (authData) {
         const { isAuthenticated, userEmail } = JSON.parse(authData);
         set({ isAuthenticated, userEmail });
      }
   },
}));
