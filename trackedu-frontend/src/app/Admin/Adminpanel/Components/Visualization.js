'use client';

import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  Grid,
  CircularProgress,
} from '@mui/material';

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const styledCourses = [
  { name: 'SQL', students: 70 },
  { name: 'JavaScript', students: 30 },
];

const upcomingCourses = [
  { name: 'Go', interest: 25 },
  { name: 'Rust', interest: 18 },
  { name: 'Kotlin', interest: 22 },
  { name: 'TypeScript', interest: 35 },
];

export default function Visualization() {
  const [loading, setLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    async function fetchTotalStudents() {
      try {
        const res = await fetch('http://localhost:5000/api/student/count');
        const data = await res.json();

        if (res.ok) {
          setTotalStudents(data.totalStudents);
        } else {
          console.error('Failed to fetch total students:', data.message);
        }
      } catch (error) {
        console.error('Error fetching total students:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTotalStudents();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        p: 4,
        background: 'linear-gradient(to right, #eef2f3, #8e9eab)',
        minHeight: '100vh',
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        color="#0f2027"
      >
        🎓 Admin Analytics Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'linear-gradient(to right, #36d1dc, #5b86e5)',
              color: '#fff',
              textAlign: 'center',
              py: 4,
              borderRadius: 4,
              boxShadow: 6,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Students Enrolled
            </Typography>
            <Typography variant="h2" fontWeight="bold">
              {totalStudents}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={1} color="#0f2027">
              🏆 Top Enrolled Programming Languages
            </Typography>
            <Typography variant="body2" mb={2} color="text.secondary">
              SQL leads with 70% followed by JavaScript at 30%.
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={styledCourses}
                  dataKey="students"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {styledCourses.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={1} color="#0f2027">
              🚀 Upcoming Courses Interest
            </Typography>
            <Typography variant="body2" mb={2} color="text.secondary">
              Highlighting potential demand based on student interest.
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={upcomingCourses}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="interest" fill="#00C49F" barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
