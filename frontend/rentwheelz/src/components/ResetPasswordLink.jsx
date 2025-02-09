import React, { useState } from 'react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ResetPasswordLink = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.post('http://localhost:8085/api/auth/forgot-password', { email });
      setMessage('A password reset link has been sent to your email.');
    } catch (error) {
      setError('There was an error sending the reset link. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Typography variant="h4" component="h2" className="mb-6 text-center">
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <TextField
            label="Email Address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            className="mb-4"
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2"
            fullWidth
          >
            Send Reset Link
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

export default ResetPasswordLink;
