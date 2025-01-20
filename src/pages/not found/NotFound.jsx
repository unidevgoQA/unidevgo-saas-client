import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: "linear-gradient(#371edc, #170b68);",
        padding: theme.spacing(3),
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '600px',
          padding: theme.spacing(4),
          borderRadius: '8px',
          boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 'bold',
            color: theme.palette.error.main,
            marginBottom: theme.spacing(3),
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.text.primary,
            marginBottom: theme.spacing(2),

          }}
        >
          Oops! Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(4),
          }}
        >
          The page you are looking for does not exist or has been moved. Please check the URL or return to the home page.
        </Typography>
        <Button
          variant="contained"
          
          size="large"
          onClick={handleGoHome}
          sx={{
            padding: theme.spacing(1, 3),
            borderRadius: '8px',
            textTransform: 'none',
            background : 'var(--primary-color)',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
