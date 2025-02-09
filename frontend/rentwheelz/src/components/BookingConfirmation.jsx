import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const BookingConfirmation = ({
  vehicle,
  startDate,
  endDate,
  onCancel,
  onProceed,
}) => {
  const calculateTotalAmount = () => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const numberOfDays = end.diff(start, "day") + 1; 
    return vehicle.pricePerDay * numberOfDays;
  };

  const totalAmount = calculateTotalAmount();

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Booking Confirmation</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Vehicle Details */}
          <Box flex={1} mr={2}>
            <div className="mb-4">
              <Typography variant="h6" fontWeight="bold">Vehicle Details</Typography>
              <p><strong>Company Name:</strong> {vehicle.companyName}</p>
              <p><strong>Model:</strong> {vehicle.model}</p>
              <p><strong>Capacity:</strong> {vehicle.capacity} passengers</p>
              <p><strong>Per Day Price:</strong> ${vehicle.pricePerDay}</p>
            </div>

            {/* Booking Dates */}
            <div className="mb-4">
              <Typography variant="h6" fontWeight="bold">Booking Dates</Typography>
              <p><strong>Start Date:</strong> {dayjs(startDate).format("YYYY-MM-DD")}</p>
              <p><strong>End Date:</strong> {dayjs(endDate).format("YYYY-MM-DD")}</p>
            </div>

           
            <div className="mb-4">
              <Typography variant="h6" fontWeight="bold">Total Amount</Typography>
              <p><strong>${totalAmount}</strong></p>
            </div>
          </Box>

          <Box
            component="img"
            src={vehicle.imageUrl}
            alt={`${vehicle.companyName} ${vehicle.model}`}
            sx={{
              width: "250px",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => onProceed(totalAmount)} color="primary" variant="contained">
          Proceed to Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingConfirmation;
