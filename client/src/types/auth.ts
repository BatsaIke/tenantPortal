// src/types/auth.ts
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'tenant' | 'admin';
  }
  
  export interface LoginData {
    identifier: string;
    password: string;
  }
  
  export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    register: (data: RegisterData) => Promise<any>;
    login: (data: LoginData) => Promise<any>;
    logout: () => void;
    resetError: () => void;
  }