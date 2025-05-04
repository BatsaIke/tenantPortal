// src/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
// import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
// import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from "./pages/auth/LoginPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ResetPasswordRequestPage } from "./components/auth/ResetPasswordRequestPage";
import { ResetPasswordConfirmPage } from "./components/auth/ResetPasswordConfirmPage";
import { LandingPage } from "./pages/landing/LandingPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordRequestPage />} />
      <Route
        path="/reset-password/confirm"
        element={<ResetPasswordConfirmPage />}
      />
            <Route path="/" element={<LandingPage />} />

      {/* <Route path="/reset-password" element={<ResetPasswordPage />} /> */}

      <Route element={<ProtectedRoute />}>
        {/* <Route path="/" element={<DashboardPage />} /> */}
        {/* Add other protected routes here */}
      </Route>
    </Routes>
  );
};
