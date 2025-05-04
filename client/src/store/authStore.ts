// client/src/store/authStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import api from '../lib/axios';
import { getApiError } from '../utils/getApiError';

/* ──────────────────────── TYPES ──────────────────────── */
interface AuthState {
  token:   string | null;
  user:    { id: string; fullName: string } | null;

  loading: boolean;
  error:   string | null;

  login:        (d: { identifier: string; password: string }) => Promise<void>;
  register:     (d: { fullName: string; email: string; phone: string; password: string }) => Promise<void>;
  requestReset: (identifier: string) => Promise<string>;      // returns devToken in dev
  confirmReset: (token: string, password: string) => Promise<void>;

  logout:     () => void;
  resetError: () => void;
}

/* ──────────────────────── STORE ──────────────────────── */
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        /* ---- state ---- */
        token: null,
        user:  null,
        loading: false,
        error:   null,

        /* ---------- LOGIN ---------- */
        async login(payload) {
          set({ loading: true, error: null });
          try {
            const { data } = await api.post('/auth/login', payload);
            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            set({ token: data.token, user: data.user, loading: false });
          } catch (err) {
            set({ error: getApiError(err), loading: false });
            throw err;
          }
        },

        /* -------- REGISTER --------- */
        async register(payload) {
          set({ loading: true, error: null });
          try {
            const { data } = await api.post('/auth/register', payload);
            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            set({ token: data.token, user: data.user, loading: false });
          } catch (err) {
            set({ error: getApiError(err), loading: false });
            throw err;
          }
        },

        /* ------ REQUEST RESET ------ */
        async requestReset(identifier: string) {
          set({ loading: true, error: null });
          try {
            const { data } = await api.post('/password/request', { identifier });
            set({ loading: false });
            return data.devToken as string;            // token only returned in dev
          } catch (err) {
            set({ error: getApiError(err), loading: false });
            throw err;
          }
        },

        /* ------ CONFIRM RESET ------ */
        async confirmReset(token: string, password: string) {
          set({ loading: true, error: null });
          try {
            await api.post('/password/confirm', { token, password });
            set({ loading: false });
          } catch (err) {
            set({ error: getApiError(err), loading: false });
            throw err;
          }
        },

        /* ------------ LOGOUT ------------ */
        logout() {
          api.defaults.headers.common.Authorization = undefined;
          set({ token: null, user: null });
        },

        resetError() {
          set({ error: null });
        },
      }),
      {
        name: 'auth-storage',
        /* Persist only token + user so errors don't stick around */
        partialize: (state) => ({ token: state.token, user: state.user }),
      }
    )
  )
);
