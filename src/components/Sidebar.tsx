import React from 'react';
import { useTheme } from '../context/theme/ThemeContext';
const Sidebar: React.FC = () => {
    const { theme } = useTheme(); 
  return (
    <div className={`bg-purple-800 text-white w-64 p-6 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
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
          <a
            href="#"
            className="hover:text-purple-300 transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            Orders
          </a>
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
  );
};

export default Sidebar;
