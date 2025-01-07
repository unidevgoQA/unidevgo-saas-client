import DetailsIcon from '@mui/icons-material/Details';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Card,
    Grid,
    IconButton,
    Tab,
    Tabs,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const AdminProfile = () => {
  const admin = {
    id: "admin0323",
    name: "Chirs Brown",
    email: "chirs.brown@gmail.com",
    password: "ewqe34534",
    role: "admin",
    isDeleted: false
  };

  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
        {/* Sidebar */}
        <Box
          sx={{
            minWidth: isMobile ? '100%' : '300px',
            backgroundColor: '#371edc',
            color: '#fff',
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar
              alt={admin.name}
              sx={{ width: 100, height: 100, border: '2px solid #fff' }}
            >
              {admin.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              {admin.name}
            </Typography>
            <Typography variant="body2" textAlign="center">
              {admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
            </Typography>
            <IconButton sx={{ color: '#fff', border: '1px solid #fff' }}>
              <EditIcon />
            </IconButton>
          </Box>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            orientation={isMobile ? 'horizontal' : 'vertical'}
            sx={{
              mt: 3,
              '& .MuiTab-root': {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                color: '#fff',
              },
              '& .Mui-selected': {
                color: '#fff !important',
                fontWeight: 'bold',
              },
            }}
            TabIndicatorProps={{ style: { backgroundColor: '#fff' } }}
          >
            <Tab icon={<InfoIcon />} label="Overview" />
            <Tab icon={<DetailsIcon />} label="Details" />
          </Tabs>
        </Box>

        {/* Content Area */}
        <Card sx={{ flexGrow: 1, boxShadow: 3, p: 3 }}>
          {tabValue === 0 && (
            <>
              {/* <Typography variant="h6" sx={{ color: 'var(--primary-color)' }} gutterBottom fontWeight="bold">
                Personal Information
              </Typography> */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <EmailIcon sx={{ color: '#371edc' }} /> Email
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{admin.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <DetailsIcon sx={{ color: '#371edc' }} /> Role
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{admin.role}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {tabValue === 1 && (
            <Box>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#371edc' }} />}>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LockIcon sx={{ color: '#371edc' }} /> Account Settings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Account Deleted: {admin.isDeleted ? 'Yes' : 'No'}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default AdminProfile;
