import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';  // Import the NavigationBar component
import Sidebar from '../../components/Sidebar';
import { useTheme } from '../../context/theme/ThemeContext';
import axios from 'axios';
const Dashboard: React.FC = () => {
    const {theme}=useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`flex flex-col h-screen bg-gray-100 ${theme === 'dark' ? 'dark' : 'light'}`}>
      <NavigationBar /> {/* Add the navigation bar at the top */}
      <div className="flex flex-1">
        <Sidebar />
        </div>
    </div>
  );
};

export default Dashboard;
