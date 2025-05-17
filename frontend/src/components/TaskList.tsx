import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Button, Typography, Box
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Task {
  id: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  originalFilename: string;
  compressedFileUrl?: string;
}

interface TaskListProps {
  refreshTrigger: number;
}

const TaskList = ({ refreshTrigger }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [refreshTrigger]);

  const getStatusChip = (status: Task['status']) => {
    let color;
    switch (status) {
      case 'completed':
        color = '#4caf50';
        break;
      case 'failed':
        color = '#f44336';
        break;
      default:
        color = '#ff9800';
    }

    return (
      <Box
        sx={{
          bgcolor: color,
          color: 'white',
          borderRadius: '16px',
          px: 1.5,
          py: 0.5,
          display: 'inline-block',
          textTransform: 'capitalize'
        }}
      >
        {status}
      </Box>
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary" align="center" my={2}>
        No tasks found. Submit a task to get started.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Original File</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.originalFilename}</TableCell>
              <TableCell>{getStatusChip(task.status)}</TableCell>
              <TableCell>
                {task.status === 'completed' && task.compressedFileUrl ? (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FileDownloadIcon />}
                    href={task.compressedFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    disabled
                    startIcon={<FileDownloadIcon />}
                  >
                    Download
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
