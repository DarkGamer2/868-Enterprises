import { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import { useTheme } from "../context/theme/ThemeContext";
import { useCart } from "../context/cart-context";
import { useUser } from "../context/user-context"; // Import the useUser hook
import Logo from "../../public/assets/images/Logo.jpg";

const NavigationBar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { theme, toggleTheme } = useTheme();
  const { cartItems, setCartItems } = useCart(); // Get setCartItems function from the cart context
  const { user, setUser } = useUser(); // Get the user and setUser function from the user context

  const cartItemCount = Object.values(cartItems).reduce(
    (acc, count) => acc + count,
    0
  );

  const handleLogout = () => {
    setUser(null); // Clear the user information on logout
    setCartItems({}); // Clear the cart items on logout
    // Add any additional logout logic here (e.g., clearing cookies, redirecting)
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform search action with searchQuery
    console.log("Search query:", searchQuery);
    // Add your search logic here (e.g., redirect to search results page)
  };

  return (
    <div className={`w-full shadow ${theme === "dark" ? "dark" : "light"}`}>
      <nav className="dark:bg-black bg-white">
        <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:px-8">
          {/* Left Side: Logo and Text */}
          <div className="flex items-center flex-shrink-0">
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

          {/* Center: Links */}
          <div className="hidden md:flex md:space-x-8 flex-grow justify-center">
            <NavLink
              to="/"
              className="text-black dark:text-white font-inter tracking-wider uppercase text-md whitespace-nowrap hover:underline"
            >
              Home
            </NavLink>
            {[
              "Household Items",
              "Makeup",
              "Clothing",
              "Medical Supplies",
              "Contact",
            ].map((item, index) => (
              <NavLink
                key={index}
                to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                className="text-black dark:text-white font-inter tracking-wider uppercase text-md whitespace-nowrap hover:underline"
              >
                {item}
              </NavLink>
            ))}
          </div>

          {/* Right Side: Search Bar and Icons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className={`hidden md:flex items-center space-x-2 transition-transform duration-300 ${
                searchOpen ? "max-w-xs" : "max-w-0 overflow-hidden"
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ marginRight: "8px" }} // Add margin to the search bar
              />
            </form>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="px-4 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
            >
              <SearchIcon />
            </button>

            <NavLink
              to={"/cart"}
              className="px-2 py-2 rounded-md shadow hover:bg-gray-600"
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon className="dark:text-white" />
              </Badge>
            </NavLink>
            <button
              onClick={toggleTheme}
              className="px-2 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
            >
              <DarkModeIcon />
            </button>
            {user ? (
              <div className="flex items-center space-x-2">
                <NavLink
                  to={"/dashboard"}
                  className="flex items-center space-x-1 px-2 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
                >
                  <AccountCircleIcon />
                  <span>{user.username}</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-2 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
                >
                  <LogoutIcon />
                </button>
              </div>
            ) : (
              <NavLink
                to={"/login"}
                className="px-2 py-2 text-blue-600 rounded-md shadow hover:bg-gray-600 dark:text-white"
              >
                <LoginIcon />
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border dark:text-white"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`transition-[max-height] duration-700 ease-in-out overflow-hidden ${
            navbarOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } md:opacity-100 md:max-h-full md:hidden`}
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            <NavLink
              to="/"
              className="text-black dark:text-white font-inter tracking-wider uppercase text-md whitespace-nowrap hover:underline"
            >
              Home
            </NavLink>
            {[
              "Household Items",
              "Makeup",
              "Clothing",
              "Medical Supplies",
              "Contact",
            ].map((item, index) => (
              <NavLink
                key={index}
                to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                className="text-black dark:text-white font-inter tracking-wider uppercase text-md whitespace-nowrap hover:underline"
              >
                {item}
              </NavLink>
            ))}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white">
                <SearchIcon />
              </button>
            </div>
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
            {user ? (
              <>
                <NavLink
                  to={"/dashboard"}
                  className="flex items-center space-x-1 px-4 py-2 rounded-md shadow hover:bg-gray-800 dark:text-white"
                >
                  <AccountCircleIcon />
                  <span>{user.username}</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-center rounded-md shadow hover:bg-gray-800 dark:text-white"
                >
                  <LogoutIcon />
                </button>
              </>
            ) : (
              <NavLink
                to={"/login"}
                className="block px-4 py-2 text-center rounded-md shadow hover:bg-gray-800 dark:text-white"
              >
                <LoginIcon />
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;