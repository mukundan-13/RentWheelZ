import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount, vehicleId } = location.state || {};

  const [paymentOption, setPaymentOption] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
    if (paymentOption === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      Swal.fire({
        title: 'Incomplete Card Details',
        text: 'Please fill in all card details.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return;
    }

    if (paymentOption === 'upi' && !upiId) {
      Swal.fire({
        title: 'Incomplete UPI Details',
        text: 'Please provide your UPI ID.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return;
    }

    try {
      Swal.fire({
        title: 'Processing Payment',
        text: 'Please wait...',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      const userId = localStorage.getItem('userId');
      const startDate = localStorage.getItem('startDate');
      const endDate = localStorage.getItem('endDate');
      console.log(userId);
      console.log(startDate);
      console.log(endDate);
      const bookingData = {
        vehicle: { id: vehicleId },
        user: { id: userId },
        startDate,
        endDate,
        totalPrice: totalAmount,
        status: 'CONFIRMED',
      };

      const token = localStorage.getItem('token');
    
      const response = await fetch('http://localhost:8085/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
        throw new Error('Failed to create booking');
    }
    
    const booking = await response.json(); 
    
    Swal.fire({
        title: 'Payment Successful!',
        text: `Your payment of $${totalAmount} has been processed.`,
        icon: 'success',
        confirmButtonText: 'Continue',
    }).then(() => {
        const bookingId = booking.id;
        navigate(`/booking-summary/${bookingId}`); 
    });
    
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const handleCancelPayment = () => {
    Swal.fire({
      title: 'Cancel Payment?',
      text: 'Are you sure you want to cancel the payment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel',
      cancelButtonText: 'No, Go Back',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/'); 
      }
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 4,
        p: 4,
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Amount: <strong>${totalAmount}</strong>
      </Typography>

      <Box mt={3}>
        <Typography variant="h6">Select Payment Option</Typography>
        <RadioGroup value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)}>
          <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
        </RadioGroup>
      </Box>

      {paymentOption === 'card' && (
        <Box mt={2}>
          <TextField
            label="Card Number"
            type="text"
            fullWidth
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            inputProps={{ maxLength: 16 }}
            placeholder="1234 5678 9012 3456"
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between" gap={2}>
            <TextField
              label="Expiry Date"
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              sx={{ flex: 1 }}
            />
            <TextField
              label="CVV"
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              inputProps={{ maxLength: 3 }}
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
      )}

      {paymentOption === 'upi' && (
        <Box mt={2}>
          <TextField
            label="UPI ID"
            type="text"
            fullWidth
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="yourname@upi"
          />
        </Box>
      )}

      <Box mt={3} display="flex" justifyContent="space-between">
        <Button variant="contained" color="error" onClick={handleCancelPayment}>
          Cancel
        </Button>
        <Button variant="contained" color="success" onClick={handleConfirmPayment} disabled={!paymentOption}>
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;
