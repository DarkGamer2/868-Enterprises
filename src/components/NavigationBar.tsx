import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { Badge } from "@mui/material";
import { useTheme } from "../context/theme/ThemeContext";
import { useCart } from "../context/cart-context";

import Logo from "../assets/images/E34F60E7-1962-441B-B5D8-CFA7E493FBB9.jpg";

const NavigationBar = () => {
  const [navbaropen, setNavBarOpen] = React.useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useCart();

  const cartItemCount = Object.values(cartItems).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <div className={`w-full shadow ${theme === "dark" ? "dark" : "light"}`}>
      <nav className="dark:bg-black bg-white">
        <div className="flex justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          {/* Logo and Mobile Menu Icon */}
          <div className="flex items-center justify-between py-3 w-full md:w-auto">
            <div className="flex items-center">
              <img
                src={Logo}
                alt="Company Logo"
                className="w-10 h-10 mr-3" // Adjust for logo size
              />
              <h2
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                MEWZALINE
              </h2>
            </div>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border dark:text-white"
                onClick={() => setNavBarOpen(!navbaropen)}
              >
                {navbaropen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {/* Links */}
          <div
            className={`transition-[max-height] duration-700 ease-in-out overflow-hidden w-full md:w-auto ${
              navbaropen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } md:opacity-100 md:max-h-full md:flex-1 md:flex items-center justify-between md:space-x-6 pb-3 mt-4 md:pb-0 md:mt-0`}
          >
            {/* Link Items */}
            <ul className="flex flex-col md:flex-row items-center justify-center md:space-x-8 w-full">
              {[
                "Home",
                "Household Items",
                "Makeup",
                "Tech/Electronics",
                "Clothing",
                "Medical Supplies",
                "Contact",
              ].map((item, index) => (
                <li
                  key={index}
                  className="text-black dark:text-white font-inter tracking-wider uppercase text-md whitespace-nowrap"
                >
                  {" "}
                  {/* Added whitespace-nowrap */}
                  <NavLink
                    to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="hover:underline"
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Buttons */}
            <div className="mt-4 space-y-2 lg:hidden md:inline-block w-full flex flex-col items-center">
              <NavLink
                to={"/cart"}
                className="block px-4 py-2 text-center text-blue-600 rounded-md shadow hover:bg-gray-800"
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon className="dark:text-white" />
                </Badge>
              </NavLink>
              <button
                onClick={toggleTheme}
                className="block px-4 py-2 text-center rounded-md shadow hover:bg-gray-800 dark:text-white"
              >
                <DarkModeIcon />
              </button>
              <NavLink
                to={"/login"}
                className="block px-4 py-2 text-center rounded-md shadow hover:bg-gray-800 dark:text-white"
              >
                <LoginIcon />
              </NavLink>
            </div>
          </div>

          {/* Desktop Menu Buttons */}
          <div className="hidden md:inline-flex space-x-4 items-center">
            <NavLink
              to={"/cart"}
              className="px-4 py-2 rounded-md shadow hover:bg-gray-600"
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon className="dark:text-white" />
              </Badge>
            </NavLink>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
            >
              <DarkModeIcon />
            </button>
            <NavLink
              to={"/login"}
              className="px-4 py-2 text-blue-600 rounded-md shadow hover:bg-gray-600 dark:text-white"
            >
              <LoginIcon />
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
