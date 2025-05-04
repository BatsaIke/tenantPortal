// src/components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const ProtectedRoute = () => {
  const { token } = useAuthStore();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};