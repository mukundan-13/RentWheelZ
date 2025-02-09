import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const DateSearch = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate) {
      setStartDate(dayjs(storedStartDate));
    }
    if (storedEndDate) {
      setEndDate(dayjs(storedEndDate));
    }
  }, []);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    localStorage.setItem("startDate", startDate.format("YYYY-MM-DD"));
    localStorage.setItem("endDate", endDate.format("YYYY-MM-DD"));

    navigate("/cars");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f7fafc",
          padding: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 600,
            padding: 4,
            borderRadius: 5,
            backgroundColor: "#ffffff",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#444", mb: 3 }}
          >
            Find Your Rental Vehicle
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#777", mb: 4, fontSize: "16px" }}
          >
            Select the start and end dates to discover available vehicles during
            your preferred time.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
   
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={dayjs()}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "#f4f5f7",
                },
              }}
            />
       
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate || dayjs()}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "#f4f5f7",
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                backgroundColor: "#1a73e8",
                "&:hover": { backgroundColor: "#004ba0" },
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Search Available Vehicles
            </Button>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default DateSearch;
