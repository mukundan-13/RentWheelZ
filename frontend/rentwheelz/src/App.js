import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ResetPasswordLink from './components/ResetPasswordLink';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import VehicleList from './components/VehicleList';
import DateSearch from './components/DateSearch';
import BookingConfirmation from './components/BookingConfirmation';
import PaymentPage from './components/PaymentPage';
import BookingSummary from './components/BookingSummary';
import UserBookings from './components/UserBookings';
import AddReview from './components/Review';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div style={{ paddingTop: '64px' }} className="p-4"> 
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cars" element={<VehicleList />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/reset-link" element={<ResetPasswordLink />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/search" element={<DateSearch />} />
                    <Route path="/book" element={<BookingConfirmation />} />
                    <Route path="/payment" element={<PaymentPage/>} />
                    <Route path="/booking-summary/:bookingId" element={<BookingSummary />} />
                    <Route path="/myBookings" element={<UserBookings />} />
                    <Route path="/add-review/:vehicleId" element={<AddReview />} />
                    

                </Routes>
            </div>
        </Router>
    );
};

export default App;
