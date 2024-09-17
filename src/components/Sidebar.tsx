import React from 'react';
import { useTheme } from '../context/theme/ThemeContext';
import { NavLink } from 'react-router-dom';
const Sidebar: React.FC = () => {
    const { theme } = useTheme(); 
  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>

   
    <div className={`bg-purple-800 text-white w-64 p-6 dark:bg-black`}>
      <h2 className="text-2xl font-bold mb-8">MEWZALINE</h2>
      <ul>
        <li className="mb-4">
          <a
            href="#"
            className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            Dashboard
          </a>
        </li>
        <li className="mb-4">
          <NavLink to="/orders" className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2">Orders</NavLink>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            Products
          </a>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            Marketing
          </a>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            Rates
          </a>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            Reports
          </a>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
