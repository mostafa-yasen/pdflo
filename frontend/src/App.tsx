import { useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          PDFlo - PDF Compression Service
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Submit New Task
          </Typography>
          <TaskForm onTaskSubmitted={triggerRefresh} />
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Task List
          </Typography>
          <TaskList refreshTrigger={refreshTrigger} />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
