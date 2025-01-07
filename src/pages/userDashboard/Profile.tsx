import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../../components/NavigationBar';
import Sidebar from '../../components/Sidebar';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        avatar: '',
    });

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    const getProfileData = async () => {
        try {
            const response = await axios.get('https://868-enterprises-api-production.up.railway.app/api/users/profile');
            setProfileData(response.data);
        } catch (error) {
            console.error('Error fetching profile data', error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavigationBar />
          <Box display="flex" flexGrow={1} minHeight="100vh"> {/* Updated minHeight to 100vh */}
            <Sidebar />
            <Container maxWidth="md" sx={{ flexGrow: 1 }}>
              <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                <Avatar alt="User Avatar" src={profileData.avatar || '/path/to/default-avatar.jpg'} sx={{ width: 100, height: 100 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                  {profileData.name || 'User Name'}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {profileData.email || 'user.email@example.com'}
                </Typography>
                <Box mt={3} width="100%">
                  <Box mt={3} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleEditProfile}>
                      Edit Profile
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </div>
      );
      
};

export default Profile;