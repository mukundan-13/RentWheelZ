import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Box
                style={{
                    position: 'relative',
                    height: '100vh',
                    backgroundImage: 'url(https://shorturl.at/tYmfe)', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                <Container
                    maxWidth="md"
                    style={{
                        textAlign: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        padding: '20px',
                        borderRadius: '10px',
                    }}
                >
                    <Typography variant="h3" gutterBottom style={{ fontWeight: 700 }}>
                        Welcome to RentWheelz!
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Your go-to platform for all your rental needs.
                    </Typography>
                    <Link to="/signup">
                        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Get Started
                        </Button>
                    </Link>
                </Container>
            </Box>

            <Container maxWidth="lg" style={{ marginTop: '50px', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Why Choose Us?
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Box
                            style={{
                                padding: '20px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img src="https://rb.gy/jy0juk" alt="Easy Booking" style={{ width: '100%', borderRadius: '8px' }} />
                            <Typography variant="h6" gutterBottom>
                                Easy Booking
                            </Typography>
                            <Typography variant="body1">
                                Book your car with just a few clicks. Simple and hassle-free process.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box
                            style={{
                                padding: '20px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img src="https://rb.gy/k4oglt" alt="Wide Selection" style={{ width: '100%', borderRadius: '8px' }} />
                            <Typography variant="h6" gutterBottom>
                                Wide Selection
                            </Typography>
                            <Typography variant="body1">
                                Choose from a wide variety of cars for all occasions.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box
                            style={{
                                padding: '20px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img src="https://rb.gy/1js81m" alt="Affordable Rates" style={{ width: '100%', borderRadius: '8px' }} />
                            <Typography variant="h6" gutterBottom>
                                Affordable Rates
                            </Typography>
                            <Typography variant="body1">
                                Rent your car at competitive prices. We offer affordable plans.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Box style={{ backgroundColor: '#f0f0f0', padding: '50px 0' }}>
                <Container maxWidth="lg" style={{ textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        How It Works
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Box style={{ padding: '20px' }}>
                                <img src="https://rb.gy/uu9sqb" alt="Choose Your Car" style={{ width: '100%', borderRadius: '8px' }} />
                                <Typography variant="h6" gutterBottom>
                                    Step 1: Choose Your Car
                                </Typography>
                                <Typography variant="body1">
                                    Browse through our wide selection of cars and choose the one that suits your needs.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box style={{ padding: '20px' }}>
                                <img src="https://rb.gy/2akxin" alt="Book and Pay" style={{ width: '100%', borderRadius: '8px' }} />
                                <Typography variant="h6" gutterBottom>
                                    Step 2: Book and Pay
                                </Typography>
                                <Typography variant="body1">
                                    Simply book your car and make a secure payment through our platform.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box style={{ padding: '20px' }}>
                                <img src="https://t3.ftcdn.net/jpg/02/94/95/04/360_F_294950461_FxHyWXzTfZmx1pUP9jPsFl1BtPw19cRF.jpg" alt="Enjoy Your Ride" style={{ width: '100%', borderRadius: '8px' }} />
                                <Typography variant="h6" gutterBottom>
                                    Step 3: Enjoy Your Ride
                                </Typography>
                                <Typography variant="body1">
                                    Pick up your car and hit the road! Enjoy your ride with complete peace of mind.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box style={{ backgroundColor: '#00796b', color: 'white', padding: '50px 0', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Ready to Get Started?
                </Typography>
                <Typography variant="h6" paragraph>
                    Sign up today and start renting the best cars at unbeatable prices!
                </Typography>
                <Link to="/signup">
                    <Button variant="contained" color="secondary" size="large">
                        Sign Up Now
                    </Button>
                </Link>
            </Box>

            <Box style={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center' }}>
                <Typography variant="body2">
                    © 2025 RentWheelz. All rights reserved.
                </Typography>
                <Typography variant="body2">
                    <Link to="/privacy-policy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</Link> |{' '}
                    <Link to="/terms-of-service" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</Link>
                </Typography>
            </Box>
        </>
    );
};

export default Home;
