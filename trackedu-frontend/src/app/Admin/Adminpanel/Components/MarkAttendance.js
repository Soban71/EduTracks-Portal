'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  TextField,
  Badge,
  Alert
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import axios from 'axios';

export default function MarkAttendance() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [alreadyMarked, setAlreadyMarked] = useState(false);

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    try {
      const [studentRes, summaryRes, markedRes] = await Promise.all([
        axios.get('http://localhost:5000/api/student/registeredstudents'),
        axios.get('http://localhost:5000/api/attendance/summary'),
        axios.get(`http://localhost:5000/api/attendance/marked?date=${date}`)
      ]);

      const fetchedStudents = studentRes.data.students || [];
      setStudents(fetchedStudents);
      setSummary(summaryRes.data.summary || {});
      setAlreadyMarked(markedRes.data.marked);

      // Set default attendance to present
      const initialAttendance = {};
      fetchedStudents.forEach(s => {
        initialAttendance[s.email] = 'present';
      });
      setAttendance(initialAttendance);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (email, value) => {
    setAttendance(prev => ({ ...prev, [email]: value }));
  };

  const totalPresentToday = Object.values(attendance).filter(v => v === 'present').length;
  const totalAbsentToday = Object.values(attendance).filter(v => v === 'absent').length;

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/attendance/mark', {
        date,
        attendance,
      });
      alert('Attendance saved successfully!');
      setAlreadyMarked(true); // Disable inputs
    } catch (error) {
      alert('Failed to save attendance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <EventAvailableIcon sx={{ mr: 1, color: '#1976d2', fontSize: 35 }} />
          <Typography variant="h4" fontWeight="bold" color="#1976d2">
            Mark Attendance
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="center" mb={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Select Date"
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={alreadyMarked}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            {alreadyMarked && (
              <Alert severity="info">Attendance already marked for this date</Alert>
            )}
          </Grid>
        </Grid>

        <Table sx={{ minWidth: 650 }} aria-label="attendance table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#e3f2fd' }}>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Total Present</b></TableCell>
              <TableCell><b>Total Absent</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  No registered students found.
                </TableCell>
              </TableRow>
            ) : (
              students.map(({ name, email }) => (
                <TableRow key={email} hover>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <FormControl fullWidth disabled={alreadyMarked}>
                      <Select
                        value={attendance[email] || 'present'}
                        onChange={(e) => handleChange(email, e.target.value)}
                        size="small"
                      >
                        <MenuItem value="present">Present</MenuItem>
                        <MenuItem value="absent">Absent</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>{summary[email]?.present || 0}</TableCell>
                  <TableCell>{summary[email]?.absent || 0}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
          <Badge badgeContent={totalPresentToday} color="success">
            <Typography variant="subtitle1" fontWeight="bold" color="green">
              Present Today
            </Typography>
          </Badge>

          <Badge badgeContent={totalAbsentToday} color="error">
            <Typography variant="subtitle1" fontWeight="bold" color="red">
              Absent Today
            </Typography>
          </Badge>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading || alreadyMarked || students.length === 0}
            sx={{ minWidth: 180, fontWeight: 'bold' }}
          >
            {loading ? 'Saving...' : 'Save Attendance'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
