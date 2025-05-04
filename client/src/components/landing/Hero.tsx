import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HERO_BG from './download.jpg';          // your background image

export const Hero = () => (
  <Box
    sx={{
      position: 'relative',
      minHeight: { xs: 380, md: 500 },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#fff',
      overflow: 'hidden',
      width:'100vw',

      // background image
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: 'scale(1.05)',
        zIndex: 0,
      },

      // gradient overlay (50 % opacity)
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(135deg, rgba(0, 191, 166, 0.3) 0%, rgba(0,172,193,0.5) 100%)',
        zIndex: 1,
      },
    }}
  >
    {/* ------------- centred content wrapper ------------- */}
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        py: 6,
        px: 2,
        width: '100%',          // full-width
        maxWidth: 960,          // limit for readability (≈ “md”)
        mx: 'auto',             // ← centres the block
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Renting made easy for everyone
      </Typography>

      <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
        Upload properties, manage payments, track balances — all in one modern
        portal.
      </Typography>

      <Button
        size="large"
        variant="contained"
        component={RouterLink}
        to="/register"
        sx={{
          px: 4,
          py: 1.5,
          fontSize: 18,
          bgcolor: '#fff',
          color: '#009688',
          '&:hover': { bgcolor: '#e0f2f1' },
        }}
      >
        Create free account
      </Button>
    </Box>
  </Box>
);
