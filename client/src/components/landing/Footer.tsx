import { Box, Container, Typography } from '@mui/material';

export const Footer = () => (
  <Box sx={{ py: 4, bgcolor: 'grey.100' }}>
    <Container maxWidth="lg">
      <Typography variant="body2" color="text.secondary" textAlign="center">
        © {new Date().getFullYear()} TenantPortal. All rights reserved.
      </Typography>
    </Container>
  </Box>
);
