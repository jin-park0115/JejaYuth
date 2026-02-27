import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  role: "목사님" | "리더" | "새가족 담당" | "셀원";
  cell: string;
  name: string;
}

interface AuthState {
  user: User | null;
  profile: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setAuth: (data: {
    user: any;
    accessToken: string | null;
    refreshToken: string | null;
    profile?: any;
  }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,

      setAuth: ({ user, accessToken, refreshToken, profile }) =>
        set({
          user,
          accessToken,
          refreshToken,
          profile: profile || null,
          isLoggedIn: true,
        }),

      clearAuth: () =>
        set({
          user: null,
          profile: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
