import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import Sidebar from '../../components/Sidebar';
import { useUser } from '../../context/user-context';
import { useTheme } from '../../context/theme/ThemeContext';
const Profile: React.FC = () => {
    const navigate = useNavigate();
    const {user}=useUser();
    const {theme}=useTheme();
    const handleEditProfile = () => {
        navigate('/edit-profile');
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className={`${theme==="dark"?"dark":"light"}`}>
         <div className='dark:bg-black bg-white'>
         <NavigationBar />
          <Box display="flex" flexGrow={1} minHeight="100vh"> {/* Updated minHeight to 100vh */}
            <Sidebar />
            <Container maxWidth="md" sx={{ flexGrow: 1 }}>
              <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                <Avatar alt="User Avatar" src={user?.profilePic || '/path/to/default-avatar.jpg'} sx={{ width: 100, height: 100 }} />
                <Typography variant="h4" component="h1" gutterBottom className='dark:text-white text-black'>
                  {user?.username|| 'User Name'}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom className='dark:text-white text-black'>
                  {user?.email || 'user.email@example.com'}
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
        </div>
      );
      
};

export default Profile;