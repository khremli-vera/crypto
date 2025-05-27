import { create } from "zustand";

interface AuthStore {
   isAuthenticated: boolean;
   userEmail: string | null;
   login: (email: string, password: string) => boolean;
   logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
   isAuthenticated: false,
   userEmail: null,
   login: (email, password) => {
      if (email === "test@example.com" && password === "123") {
         set({ isAuthenticated: true, userEmail: email });
         return true;
      }
      return false;
   },
   logout: () => set({ isAuthenticated: false, userEmail: null }),
}));
