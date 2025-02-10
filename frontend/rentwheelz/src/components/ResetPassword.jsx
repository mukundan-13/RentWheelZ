import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom'; 

const ResetPassword = () => {
  const API_BASE_URL="https://rentwheelz-zvep.onrender.com"
  const [searchParams] = useSearchParams(); 
  const token = searchParams.get('token'); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); 
    try {
      console.log(password);
      console.log(token);
      await axios.post(`${API_BASE_URL}/api/auth/reset-password`, { token, newPassword: password });
      setMessage('Your password has been reset successfully.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Typography variant="h4" component="h2" className="mb-6 text-center">
          Set New Password
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            className="mb-4"
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            className="mb-4"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : 'Reset Password'}
          </Button>
        </form>

        {message && (
          <Alert severity="success" className="mt-4">
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
