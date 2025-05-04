import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const MainNav = () => (
  <AppBar position="static" color="transparent" elevation={0}>
    <Container maxWidth="lg">
      <Toolbar disableGutters>

        {/* Logo / Brand */}
        <Typography
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 600, fontSize: 24, color: 'text.primary' }}
        >
          Tenant<span style={{ color: '#009688' }}>Portal</span>
        </Typography>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={RouterLink} to="/login"  color="inherit">Sign in</Button>
          <Button component={RouterLink} to="/register" variant="contained">Get started</Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
