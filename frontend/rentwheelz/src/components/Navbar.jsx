import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [, setUserId] = useState(localStorage.getItem('userId'));
    const [, setStartDate] = useState(localStorage.getItem('startDate'));
    const [, setEndDate] = useState(localStorage.getItem('endDate'));

    const navigate = useNavigate(); 

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
            setUserId(localStorage.getItem('userId'));
            setStartDate(localStorage.getItem('startDate'));
            setEndDate(localStorage.getItem('endDate'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleHomeClick = () => {
      
        if (token) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    };

    return (
        <nav style={{
            backgroundColor: '#2d3748',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                    onClick={handleHomeClick}
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'white', 
                        fontSize: '16px', 
                        cursor: 'pointer' 
                    }}
                >
                    Home
                </button>
                {token && (
                    <Link to="/profile" style={linkStyle}>Profile</Link>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {!token ? (
                    <>
                        <Link to="/search" style={linkStyle}>Cars</Link>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/signup" style={linkStyle}>Signup</Link>
                    </>
                ) : (
                    <>
                        <Link to="/myBookings" style={linkStyle}>My Bookings</Link>
                        <Link to="/search" style={linkStyle}>Cars</Link>
                        <Link
                            to="/"
                            style={linkStyle}
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('userId');
                                localStorage.removeItem('startDate');
                                localStorage.removeItem('endDate');
                                setToken(null);
                                setUserId(null);
                                setStartDate(null);
                                setEndDate(null);
                            }}
                        >
                            Logout
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const linkStyle = {
    color: 'white',
    margin: '0 10px',
    textDecoration: 'none',
    fontSize: '16px',
};

export default Navbar;
