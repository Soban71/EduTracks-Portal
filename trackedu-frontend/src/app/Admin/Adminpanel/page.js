'use client';
import { Box } from '@mui/material';
import { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Visualization from './Components/Visualization';
import AddStudent from './Components/AddStudent';
import DeleteStudent from './Components/DeleteStudent';
import CourseUpload from './Components/CourseUpload';
import MarkAttendance from './Components/MarkAttendance';
import Addassignment from './Components/Addassignment';

export default function AdminPanel() {
  const [active, setActive] = useState('Visualization');

  const renderContent = () => {
    switch (active) {
      case 'Visualization':
        return <Visualization />;
      case 'Add Student':
        return <AddStudent />;
      case 'Delete Student':
        return <DeleteStudent />;
      case 'Course Upload':
        return <CourseUpload />;
      case 'Mark Attendance':
        return <MarkAttendance />;
      case 'Add Assignment':
        return <Addassignment />;
        
      default:
        return <Visualization />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar setActive={setActive} />
      <Box sx={{ flexGrow: 1, width: '70%', padding: 4 }}>
        {renderContent()}
      </Box>
    </Box>
  );
}
