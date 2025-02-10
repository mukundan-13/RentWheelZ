import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import AddReview from './Review'; 

import Swal from 'sweetalert2';
const API_BASE_URL="https://rentwheelz-zvep.onrender.com"

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewedBookings, setReviewedBookings] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
 

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${API_BASE_URL}/api/bookings/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);

        const reviewsResponse = await axios.get(`${API_BASE_URL}/api/reviews/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const reviewedBookingIds = reviewsResponse.data.map((review) => review.booking.id);
        setReviewedBookings(reviewedBookingIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const handleAddReviewClick = (vehicleId, bookingId) => {
    setSelectedVehicleId(vehicleId);
    setSelectedBookingId(bookingId);
    setModalOpen(true);
  };

  const handleModalClose = (success) => {
    setModalOpen(false);
    if (success) {
      const fetchReviews = async () => {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');

          const reviewsResponse = await axios.get(`${API_BASE_URL}/api/reviews/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const reviewedBookingIds = reviewsResponse.data.map((review) => review.booking.id);
          setReviewedBookings(reviewedBookingIds);
        } catch (error) {
          console.error('Error refreshing reviews:', error);
        }
      };

      fetchReviews();
    }
  };

 
const handleCancelBooking = async (bookingId) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/bookings/cancel/${bookingId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));

      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${API_BASE_URL}/api/bookings/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data); 
      Swal.fire({
        title: 'Cancelled!',
        text: 'Your booking has been successfully canceled.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    console.error('Error cancelling booking:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong while canceling your booking. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (bookings.length === 0) {
    return <Typography>No bookings found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', my: 4, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      <Grid container spacing={4}>
        {bookings.map((booking) => {
          const canCancel = booking.status === 'CONFIRMED' && 
          (new Date(booking.startDate) - new Date()) > 86400000;

          return (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <Box
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: 3,
                  p: 3,
                }}
              >
                <img
                  src={booking.vehicle.imageUrl}
                  alt={booking.vehicle.model}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                />
                <Typography variant="h6">{booking.vehicle.model}</Typography>
                <Typography variant="body1">{booking.vehicle.manufacturingYear}</Typography>
                <Typography variant="body1"><strong>Start Date:</strong> {booking.startDate}</Typography>
                <Typography variant="body1"><strong>End Date:</strong> {booking.endDate}</Typography>
                <Typography variant="body1"><strong>Total Amount:</strong> ${booking.totalPrice}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {booking.status}</Typography>
                <Box >
                  
                  {canCancel && (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </Button>
                  )}
                  {booking.status === 'COMPLETED' && !reviewedBookings.includes(booking.id) && (
  <Button
    variant="contained"
    color="secondary"
    sx={{ mt: 2 }}
    onClick={() => handleAddReviewClick(booking.vehicle.id, booking.id)}
  >
    Add Review
  </Button>
)}

                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {selectedVehicleId && selectedBookingId && (
        <AddReview
          open={modalOpen}
          onClose={handleModalClose}
          vehicleId={selectedVehicleId}
          bookingId={selectedBookingId} 
        />
      )}
    </Box>
  );
};

export default UserBookings;
