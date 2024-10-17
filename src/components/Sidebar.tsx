import React from 'react';
import { useTheme } from '../context/theme/ThemeContext';
import { useUser } from '../context/user-context'; // Import the useUser hook
import { NavLink } from 'react-router-dom';
import { User } from '../types'; // Import the User interface

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useUser() as { user: User | null }; 

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'} h-full`}>
      <div className={`bg-purple-800 text-white w-64 p-6 dark:bg-black h-screen`}>
        <h2 className="text-2xl font-bold mb-8">MEWZALINE</h2>
        <ul>
          {user?.role === 'admin' ? (
            <>
              <li className="mb-4">
                <NavLink
                  to="/dashboard"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/orders"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Orders
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/products"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Products
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/marketing"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Marketing
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/rates"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Rates
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/reports"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Reports
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="mb-4">
                <NavLink
                  to="/profile"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Profile
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/orders"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Orders
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/products"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Products
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/logout"
                  className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

