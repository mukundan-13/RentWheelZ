import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import VehicleCard from './VehicleCard';
import { CircularProgress, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const VehicleList = () => {
  const API_BASE_URL="https://rentwheelz-zvep.onrender.com"
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const [startDate, setStartDate] = useState(
    dayjs(localStorage.getItem('startDate')) || dayjs()
  );
  const [endDate, setEndDate] = useState(
    dayjs(localStorage.getItem('endDate')) || dayjs()
  );

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/vehicles/available`, {
        params: {
          companyName: companyName || undefined,
          sortBy: sortByPrice || undefined,
          capacity: selectedCapacity.join(',') || undefined,
          rating: selectedRatings.join(',') || undefined,
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        },
      });
      setVehicles(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch vehicles. Please try again later.');
    }
    setLoading(false);
  }, [companyName, sortByPrice, selectedCapacity, selectedRatings, startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchVehicles();
    }
  }, [startDate, endDate, fetchVehicles]);

  useEffect(() => {
    localStorage.setItem('startDate', startDate.format('YYYY-MM-DD'));
  }, [startDate]);

  useEffect(() => {
    localStorage.setItem('endDate', endDate.format('YYYY-MM-DD'));
  }, [endDate]);

  const handleCapacityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCapacity([...selectedCapacity, value]);
    } else {
      setSelectedCapacity(selectedCapacity.filter((item) => item !== value));
    }
  };

  const handleRatingChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRatings([...selectedRatings, value]);
    } else {
      setSelectedRatings(selectedRatings.filter((item) => item !== value));
    }
  };

  const handleClearFilters = () => {
    setCompanyName('');
    setSortByPrice('');
    setSelectedCapacity([]);
    setSelectedRatings([]);
    setStartDate(dayjs());
    setEndDate(dayjs());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Explore Our Vehicles</h1>

        <div className="flex gap-4 justify-end mb-8">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={dayjs()}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate || dayjs()}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </div>

        <div className="flex flex-wrap gap-8">
       
          <div className="w-full sm:w-1/3 md:w-1/4 bg-gray-100 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Filters</h2>
            <div className="space-y-6">
           
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Company Name</h3>
                <TextField
                  placeholder="Enter company name"
                  variant="outlined"
                  fullWidth
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Sort by Price</h3>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={sortByPrice}
                  onChange={(e) => setSortByPrice(e.target.value)}
                >
                  <option value="">Sort by Price</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Seating Capacity</h3>
                <FormGroup>
                  {[4, 5, 7].map((capacity) => (
                    <FormControlLabel
                      key={capacity}
                      control={
                        <Checkbox
                          value={capacity}
                          checked={selectedCapacity.includes(String(capacity))}
                          onChange={handleCapacityChange}
                        />
                      }
                      label={`${capacity} Seats`}
                    />
                  ))}
                </FormGroup>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Rating</h3>
                <FormGroup>
                  {[5, 4, 3].map((rating) => (
                    <FormControlLabel
                      key={rating}
                      control={
                        <Checkbox
                          value={rating}
                          checked={selectedRatings.includes(String(rating))}
                          onChange={handleRatingChange}
                        />
                      }
                      label={`${rating} Stars & above`}
                    />
                  ))}
                </FormGroup>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleClearFilters}
                  variant="contained"
                  color="secondary"
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <CircularProgress />
              </div>
            ) : error ? (
              <p className="text-red-500 text-center mb-4">{error}</p>
            ) : (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center w-full">
                    No vehicles found with the selected filters.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default VehicleList;
