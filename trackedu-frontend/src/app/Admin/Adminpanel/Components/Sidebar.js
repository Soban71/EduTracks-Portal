'use client';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const menuItems = [
  { label: 'Visualization', icon: <DashboardIcon /> },
  { label: 'Add Student', icon: <PersonAddIcon /> },
  { label: 'Delete Student', icon: <DeleteIcon /> },
  { label: 'Course Upload', icon: <CloudUploadIcon /> },
  { label: 'Mark Attendance', icon: <CheckCircleIcon /> },
   { label: 'Add Assignment', icon: <CheckCircleIcon /> },
];

export default function Sidebar({ setActive }) {
  const [selected, setSelected] = useState('Visualization');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear auth token
    router.push('/Admin/adminlogin'); // Redirect to login
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 260,
          backgroundColor: '#1e293b', // Dark blue
          color: '#fff',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <SchoolIcon fontSize="large" sx={{ color: '#38bdf8' }} />
          <Typography variant="h6" fontWeight="bold" color="#38bdf8">
            TrackEdu Admin
          </Typography>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => {
                setActive(item.label);
                setSelected(item.label);
              }}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor:
                  selected === item.label ? '#334155' : 'transparent',
                '&:hover': {
                  backgroundColor: '#475569',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#38bdf8' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: selected === item.label ? 'bold' : 'normal',
                  color: selected === item.label ? '#fff' : '#cbd5e1',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Logout button at bottom */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ backgroundColor: '#334155', mb: 1 }} />
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            backgroundColor: '#ef4444',
            '&:hover': { backgroundColor: '#dc2626' },
            color: '#fff',
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
