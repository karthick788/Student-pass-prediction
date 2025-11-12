import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box, 
  LinearProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    study_hours: '',
    attendance: '',
    internal_marks: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data);
    } catch (err) {
      setError('Error making prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      study_hours: '',
      attendance: '',
      internal_marks: ''
    });
    setPrediction(null);
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" color="primary">
            Student Pass Prediction
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          Enter the student's details to predict their pass/fail status based on study hours, 
          attendance, and internal marks.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Study Hours (0-10)"
                name="study_hours"
                type="number"
                inputProps={{ min: 0, max: 10, step: 0.5 }}
                value={formData.study_hours}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Attendance (%)"
                name="attendance"
                type="number"
                inputProps={{ min: 30, max: 100 }}
                value={formData.attendance}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Internal Marks (20-100)"
                name="internal_marks"
                type="number"
                inputProps={{ min: 20, max: 100 }}
                value={formData.internal_marks}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box mt={4} display="flex" gap={2} justifyContent="flex-end">
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              disabled={loading}
              startIcon={<SchoolIcon />}
            >
              {loading ? 'Predicting...' : 'Predict'}
            </Button>
          </Box>
        </Box>

        {loading && <LinearProgress sx={{ mt: 2 }} />}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {prediction && (
          <Box mt={4}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {prediction.prediction === 1 ? (
                    <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                  ) : (
                    <HighlightOffIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
                  )}
                  <Typography variant="h5" component="h2">
                    {prediction.prediction === 1 
                      ? '🎉 Student is predicted to PASS' 
                      : '⚠️ Student is predicted to FAIL'}
                  </Typography>
                </Box>
                
                <Typography variant="body1" color="text.secondary">
                  Probability of passing: <strong>{(prediction.probability * 100).toFixed(2)}%</strong>
                </Typography>
                
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Based on the input data:
                  </Typography>
                  <ul>
                    <li>Study Hours: {formData.study_hours} hours/day</li>
                    <li>Attendance: {formData.attendance}%</li>
                    <li>Internal Marks: {formData.internal_marks}/100</li>
                  </ul>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
