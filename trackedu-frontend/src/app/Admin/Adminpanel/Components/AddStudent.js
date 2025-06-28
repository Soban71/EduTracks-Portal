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
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from 'react';

export default function AddStudent() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dob: '',
    fatherName: '',
    cnic: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    const { email, firstName, lastName, dob, fatherName, cnic, password, confirmPassword } = formData;

    if (!email || !firstName || !lastName || !dob || !fatherName || !cnic || !password || !confirmPassword) {
      return 'Please fill in all fields';
    }

    if (!/^\d{13}$/.test(cnic)) {
      return 'CNIC must be exactly 13 digits';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    try {
      const res = await fetch('http://localhost:5000/api/student/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || 'Something went wrong');

      setSuccess(data.message);
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        dob: '',
        fatherName: '',
        cnic: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError('Server error, please try again later');
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PersonAddAlt1Icon sx={{ color: '#2563eb', mr: 1 }} fontSize="large" />
          <Typography variant="h5" fontWeight="bold" color="#1e293b">
            Add Student
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Father's Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="CNIC"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              inputProps={{ maxLength: 13 }}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                backgroundColor: '#2563eb',
                ':hover': { backgroundColor: '#1d4ed8' },
                borderRadius: 2,
                textTransform: 'none',
              }}
              fullWidth
            >
              Register Student
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
