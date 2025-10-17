import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any | null;
  profile: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setAuth: (data: {
    user: any;
    accessToken: string;
    refreshToken: string;
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
