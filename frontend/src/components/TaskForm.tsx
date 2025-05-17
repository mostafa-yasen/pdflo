import { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';

interface TaskFormProps {
  onTaskSubmitted: () => void;
}

const TaskForm = ({ onTaskSubmitted }: TaskFormProps) => {
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error('Please enter a task description');
      return;
    }

    if (!selectedFile) {
      toast.error('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('file', selectedFile);

    setIsSubmitting(true);

    try {
      await axios.post('/api/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Task submitted successfully');
      setDescription('');
      setSelectedFile(null);
      onTaskSubmitted();
    } catch (error) {
      console.error('Error submitting task:', error);
      toast.error('Failed to submit task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Task Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        required
        disabled={isSubmitting}
      />

      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #cccccc',
          borderRadius: 2,
          p: 3,
          mb: 2,
          textAlign: 'center',
          backgroundColor: isDragActive ? '#f0f9ff' : 'transparent',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <Typography>Selected file: {selectedFile.name}</Typography>
        ) : isDragActive ? (
          <Typography>Drop the PDF here...</Typography>
        ) : (
          <Typography>Drag and drop a PDF file here, or click to select a file</Typography>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting || !selectedFile || !description.trim()}
        startIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : null}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Task'}
      </Button>
    </form>
  );
};

export default TaskForm;
