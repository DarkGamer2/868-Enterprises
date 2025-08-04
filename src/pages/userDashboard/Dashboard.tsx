import React, { useEffect} from 'react';
import NavigationBar from '../../components/NavigationBar';  // Import the NavigationBar component
import Sidebar from '../../components/Sidebar';
import { useTheme } from '../../context/theme/ThemeContext';
import { useAuth } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
    const {theme}=useTheme();
    const navigate = useNavigate();
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // setLoaded(true);
  }, []);

  if (!isAuthenticated) {
    navigate('/login'); // Should not happen if ProtectedRoute works correctly
    return null;
  }

  return (
    <div className={`flex flex-col h-screen bg-gray-100 ${theme === 'dark' ? 'dark' : 'light'}`}>
      <NavigationBar /> {/* Add the navigation bar at the top */}
      <div className="flex flex-1">
        <Sidebar />
        <p>Welcome to the dashboard.</p>
        </div>
    </div>
  );
};

export default Dashboard;
