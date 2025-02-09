import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, TextField, Typography, Paper, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const navigate = useNavigate(); 
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8085/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (err) {
            setError('Failed to fetch user profile');
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8085/user/profile', user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.'
            });
            setIsEditing(false); 
        } catch (err) {
            setError('Failed to update user profile');
        }
    };

    const deleteUserProfile = async () => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete('http://localhost:8085/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Profile Deleted!',
                        text: 'Your profile has been deleted successfully.'
                    });
                    localStorage.removeItem('token');
                    window.dispatchEvent(new Event('storage'));
                    navigate("/");
                }
            } catch (err) {
                setError('Failed to delete user profile');
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an issue deleting your profile. Please try again later.'
                });
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Paper elevation={3} className="p-5 max-w-md mx-auto mt-10">
            <Typography variant="h5" className="mb-4">User Profile</Typography>

            <Card sx={{ marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Profile Details</Typography>
                    {!isEditing ? (
                        <>
                            <Typography variant="body1"><strong>First Name:</strong> {user.firstName}</Typography>
                            <Typography variant="body1"><strong>Last Name:</strong> {user.lastName}</Typography>
                            <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                            <Typography variant="body1"><strong>Address:</strong> {user.address}</Typography>
                            <Typography variant="body1"><strong>Phone Number:</strong> {user.phoneNumber}</Typography>
                        </>
                    ) : (
                        <form onSubmit={updateUserProfile}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={user.email}
                                disabled
                            />
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={user.address}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                            />
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={user.phoneNumber}
                                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                            />
                            <Button type="submit" variant="contained" color="primary" className="mt-3">
                                Update Profile
                            </Button>
                        </form>
                    )}
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outlined" className="mt-3">
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                </CardContent>
            </Card>

            <Button onClick={deleteUserProfile} variant="contained" color="secondary" className="mt-4 ml-2">
                Delete Profile
            </Button>
        </Paper>
    );
};

export default UserProfile;
