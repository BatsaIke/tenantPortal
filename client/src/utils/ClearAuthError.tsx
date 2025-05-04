import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

/**
 * Whenever the URL (pathname) changes, wipe any auth error.
 * Render-less component—just include it once inside <BrowserRouter>.
 */
export const ClearAuthError = () => {
  const { resetError } = useAuthStore();
  const { pathname }   = useLocation();

  useEffect(() => resetError(), [pathname]);   // ← one-liner magic
  return null;
};
