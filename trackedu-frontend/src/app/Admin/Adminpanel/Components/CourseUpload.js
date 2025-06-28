'use client';
import { useEffect, useState } from 'react';
import {
  Box, Button, FormControl, InputLabel, MenuItem,
  Select, TextField, Typography, Paper, Grid, Checkbox, FormControlLabel
} from '@mui/material';
import { Autocomplete } from '@mui/material';
import axios from 'axios';

export default function CourseUpload() {
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [visibleToAll, setVisibleToAll] = useState(true);
  const [studentList, setStudentList] = useState([]);
  const [specificStudents, setSpecificStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/student/registered-students')
    .then(res => setStudentList(res.data.students))
      .catch(console.error);
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('file', file);
    formData.append('link', link);
    formData.append('visibleToAll', visibleToAll);
    formData.append('specificStudents', specificStudents);

    try {
      const res = await axios.post('http://localhost:5000/api/course/upload', formData);
      alert(res.data.message);


      setSubject('');
    setFile(null);
    setLink('');
    setVisibleToAll(true);
    setSpecificStudents([]);

    
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>Upload Course Material</Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Subject</InputLabel>
          <Select value={subject} onChange={(e) => setSubject(e.target.value)} label="Select Subject">
            <MenuItem value="C++">C++</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="C#">C#</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Web Development">Web Development</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Optional Course Link"
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          component="label"
          sx={{ mb: 2 }}
        >
          Upload File
          <input hidden type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Button>

        <FormControlLabel
          control={
            <Checkbox
              checked={visibleToAll}
              onChange={() => setVisibleToAll(!visibleToAll)}
            />
          }
          label="Visible to All Registered Students"
        />

        {!visibleToAll && (
         <Autocomplete
  multiple
  options={studentList}
  value={specificStudents}
  onChange={(e, value) => setSpecificStudents(value)}
  getOptionLabel={(option) => option}
  renderInput={(params) => (
    <TextField {...params} label="Select Students" variant="outlined" sx={{ mt: 2 }} />
  )}
/>

        )}

        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleUpload}>
          Submit Course Material
        </Button>
      </Paper>
    </Box>
  );
}
