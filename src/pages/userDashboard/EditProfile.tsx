import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Typography, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile: React.FC = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('user.email@example.com');
    const [phoneNumber, setPhoneNumber] = useState('+1234567890');
    const [address, setAddress] = useState('123 Main St, City, Country');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleSaveChanges = async () => {
        try {
            let imageUrl = '';
            if (profileImage) {
                const formData = new FormData();
                formData.append('file', profileImage);

                const imageUploadResponse = await axios.post('https://api.example.com/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                imageUrl = imageUploadResponse.data.file;
            }

            await axios.put('https://api.example.com/profile', {
                firstName,
                lastName,
                email,
                phoneNumber,
                address,
                avatar: imageUrl,
            });

            navigate('/profile');
        } catch (error) {
            console.error('Error saving profile data', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                <Avatar alt="User Avatar" src={profileImage ? URL.createObjectURL(profileImage) : '/path/to/default-avatar.jpg'} sx={{ width: 100, height: 100 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Profile
                </Typography>
                <Box mt={3} width="100%">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload Profile Picture
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                    <Box mt={3} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default EditProfile;