// src/App.tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { theme } from './theme';
import { ClearAuthError } from './utils/ClearAuthError';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <ClearAuthError/>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
