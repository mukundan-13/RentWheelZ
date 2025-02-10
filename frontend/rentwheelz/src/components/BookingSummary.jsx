import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingSummary = () => {
  const API_BASE_URL="https://rentwheelz-zvep.onrender.com"
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/bookings/${bookingId}`);
        setBooking(response.data);

        const vehicleResponse = await axios.get(`${API_BASE_URL}/api/vehicles/${response.data.vehicle.id}`);
        setVehicle(vehicleResponse.data);
      } catch (error) {
        console.error('Error fetching booking or vehicle details:', error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!booking || !vehicle) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        my: 4,
        p: 4,
        border: '1px solid #ddd',
        borderRadius: '12px',
        boxShadow: 3,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Booking Summary
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Box
          component="img"
          src={vehicle.imageUrl || '/placeholder.jpg'}
          alt={vehicle.model || 'Vehicle Image'}
          sx={{
            width: { xs: '100%', sm: '50%' },
            height: 'auto',
            borderRadius: '12px',
            objectFit: 'cover',
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            {vehicle.model}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Manufacture Year:</strong> {vehicle.manufacturingYear}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Company Name:</strong> {vehicle.companyName}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Start Date:</strong> {booking.startDate}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>End Date:</strong> {booking.endDate}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Total Amount:</strong> ${booking.totalPrice}
        </Typography>
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/myBookings')}
          sx={{ textTransform: 'none' }}
        >
          Go to My Bookings
        </Button>
      </Box>
    </Box>
  );
};

export default BookingSummary;
