import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddReviewModal = ({ open, onClose, vehicleId, bookingId}) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!comment || !rating) {
        Swal.fire({
          icon: 'warning',
          title: 'Missing Information',
          text: 'Both comment and rating are required.',
        });
        return;
      }

      const payload = {
        user: { id: userId }, 
        vehicle: { id: vehicleId }, 
        comment,
        rating: parseInt(rating, 10), 
        booking: { id: bookingId }
      };

      await axios.post(
        `http://localhost:8085/api/reviews`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Review Submitted',
        text: 'Your review has been successfully added!',
      });
      onClose(true); 
    } catch (error) {
      onClose(true);
      console.error('Error submitting review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.response?.data?.message || 'Failed to submit review. Please try again.',
      });
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Add Your Review</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            fullWidth
            label="Comment"
            variant="outlined"
            margin="normal"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <TextField
            fullWidth
            label="Rating (1-5)"
            variant="outlined"
            margin="normal"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewModal;
