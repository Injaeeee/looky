import { User } from "@/types/user.types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  restoreSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => {
    set({
      user,
      isAuthenticated: true,
    });
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("user");
  },
  restoreSession: () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user: User = JSON.parse(userData);
      set({
        user,
        isAuthenticated: true,
      });
    }
  },
}));
