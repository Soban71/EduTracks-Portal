'use client';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';

export default function DeleteStudent() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setSuccess('');
    setError('');

    if (!email) {
      setError('Please enter an email address');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/student/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Student not found');
      } else {
        setSuccess(data.message || 'Student deleted successfully');
        setEmail('');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <DeleteForeverIcon sx={{ color: '#dc2626', mr: 1 }} fontSize="large" />
          <Typography variant="h5" fontWeight="bold" color="#1e293b">
            Delete Student
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter Student Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={handleDelete}
              fullWidth
              sx={{
                mt: 2,
                textTransform: 'none',
                borderRadius: 2,
                fontWeight: 'bold',
              }}
            >
              Delete Student
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
