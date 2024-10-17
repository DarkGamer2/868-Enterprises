import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';  // Import the NavigationBar component
import Sidebar from '../../components/Sidebar';
import TopSellingProducts from '../../components/TopSellingProducts';
import SalesStatistics from '../../components/SaleStatistics';
import UniqueVisitors from '../../components/UniqueVisitors';
import { useTheme } from '../../context/theme/ThemeContext';
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
        <div className={`flex-1 p-6 transform transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} dark:bg-black`}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-black">Welcome, Damian</h1>
            <div className="flex space-x-4">
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                <p>23,789 Orders</p>
              </div>
              <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg">
                <p>$12,890.89 Profit</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesStatistics />
            </div>
            <div>
              <UniqueVisitors />
            </div>
          </div>
          <TopSellingProducts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
