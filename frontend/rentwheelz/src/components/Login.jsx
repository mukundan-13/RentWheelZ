import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { TextField, Button, Container, Box, Typography, Paper, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const API_BASE_URL="https://rentwheelz-zvep.onrender.com"
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                email,
                password,
            });
            console.log(response.data);
            console.log(response);
        
            localStorage.setItem('token', response.data);
            window.dispatchEvent(new Event('storage'));

            const token = localStorage.getItem('token');
            console.log(token);
            const res = await axios.get(`${API_BASE_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(res);

            localStorage.setItem('userId', res.data.id);
            window.dispatchEvent(new Event('storage'));
            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/dashboard');

            setEmail('');
            setPassword('');
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Error logging in',
                text: 'Invalid email or password. Please try again.',
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 10 }}>
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
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                required
                                autoFocus
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
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 3 }}
                    >
                        Login
                    </Button>

                    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Link to="/reset-link" style={{ color: '#1976d2' }}>
                            Forgot Password?
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
