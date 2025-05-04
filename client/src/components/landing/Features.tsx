import { Box, Paper, Typography, Container } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import HomeIcon from '@mui/icons-material/Home';
import PaymentsIcon from '@mui/icons-material/Payments';

const features = [
  {
    icon: <UploadIcon fontSize="large" color="primary" />,
    title: 'List instantly',
    text: 'Add property photos, price & location in seconds.',
  },
  {
    icon: <HomeIcon fontSize="large" color="primary" />,
    title: 'Real-time status',
    text: 'See approvals and renter interest at a glance.',
  },
  {
    icon: <PaymentsIcon fontSize="large" color="primary" />,
    title: 'Finance hub',
    text: 'Automated commission and payment balance tracking.',
  },
];

export const Features = () => (
  <Container maxWidth="lg" sx={{ py: 10 }}>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: 'center',
      }}
    >
      {features.map(({ icon, title, text }) => (
        <Box
          key={title}
          sx={{
            flex: '1 1 300px', // responsive
            maxWidth: '360px',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 3,
              height: '100%',
            }}
          >
            {icon}
            <Typography variant="h6" fontWeight={600} mt={2} mb={1}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  </Container>
);
