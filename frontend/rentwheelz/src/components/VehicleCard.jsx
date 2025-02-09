import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Box, Rating } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BookingConfirmation from './BookingConfirmation';

const VehicleCard = ({ vehicle }) => {
  const [isConfirming, setIsConfirming] = useState(false); 
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null); 
  const navigate = useNavigate();

  const handleBooking = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Not Authenticated',
        text: 'Please log in or sign up to book a vehicle.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Go to Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } else {
      const defaultStartDate = new Date().toISOString().split('T')[0];
      const defaultEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      console.log(vehicle);
      setIsConfirming(true); 
    }
  };

  const handleCancelConfirmation = () => {
    setIsConfirming(false);
  };

  const handleProceedToPayment = (totalAmount) => {
    setIsConfirming(false); 
    navigate('/payment', { state: { totalAmount, vehicleId: vehicle.id } }); 
  };

  return (
    <>
      <Card className="m-4 flex flex-col md:flex-row"> 
        <Box className="flex flex-col justify-between w-full md:w-3/4 px-4 py-3">
          <CardContent className="flex-grow">
            <Typography variant="h5">{vehicle.companyName}</Typography>
            <Typography variant="subtitle1">{vehicle.model}</Typography>
            <Typography variant="body2">Manufacturing Year: {vehicle.manufacturingYear}</Typography>
            <Typography variant="body2">Number Plate: {vehicle.numberPlate}</Typography>
            <Typography variant="body2">Capacity: {vehicle.capacity}</Typography>
            <Typography variant="body2">Price/Day: ${vehicle.pricePerDay}</Typography>
            <Box display="flex" alignItems="center" my={1}>
              <Typography variant="body2" mr={1}>Rating:</Typography>
              <Rating name="vehicle-rating" value={vehicle.rating} readOnly precision={0.1} />
              ({vehicle.rating})
            </Box>
          </CardContent>

          <Box display="flex" justifyContent="center" p={2}>
            <Button variant="contained" color="success" onClick={handleBooking}>
              Book
            </Button>
          </Box>
        </Box>

        <Box
          className="flex justify-center items-center"
          sx={{
            width: { xs: '100%', md: '25%' }, 
            height: '100%',
            padding: '8px'
          }}
        >
          <CardMedia
            component="img"
            className="object-cover w-2/3 h-2/3" 
            image={vehicle.imageUrl}
            alt={`${vehicle.companyName} ${vehicle.model}`}
          />
        </Box>
      </Card>
      {isConfirming && (
        <BookingConfirmation
          vehicle={vehicle}
          startDate={startDate}
          endDate={endDate}
          onCancel={handleCancelConfirmation}
          onProceed={handleProceedToPayment}
        />
      )}
    </>
  );
};

export default VehicleCard;
