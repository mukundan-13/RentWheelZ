import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { TextField, Button, Container, Box, Grid, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
    const API_BASE_URL="https://rentwheelz-zvep.onrender.com"
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [role] = useState('CUSTOMER');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/auth/register`, {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                address,
                role,
            });

            Swal.fire({
                icon: 'success',
                title: 'Signed up successfully!',
                showConfirmButton: false,
                timer: 1500,
            });

            setTimeout(() => navigate('/login'), 1500);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPhoneNumber('');
            setAddress('');
            setError('');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error signing up!',
                text: error.response?.data || 'Unknown error',
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                                required
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>

                    {error && (
                        <Typography color="error" variant="body2" align="center" sx={{ marginTop: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Sign Up
                    </Button>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#1976d2' }}>
                            Login here
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;
