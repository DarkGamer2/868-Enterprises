import { useContext, useState } from "react";
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
import { CartContext } from "../context/cart-context";
import { useUser } from "../context/user-context";
import Logo from "/assets/images/Logo.jpg";

const NavigationBar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { theme, toggleTheme } = useTheme();
  const { items,deleteFromCart } = useContext(CartContext);
  const { user, setUser } = useUser();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    deleteFromCart
    // Add additional logout logic here, such as redirecting
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Add your search logic here
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Household Items", path: "/householditems" },
    { label: "Makeup", path: "/makeup" },
    { label: "Clothing", path: "/clothing" },
    { label: "Medical Supplies", path: "/medicalsupplies" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className={`w-full shadow ${theme === "dark" ? "dark" : "light"}`}>
      <nav className="dark:bg-black bg-white">
        <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:px-8">
          {/* Left Side: Logo and Text */}
          <div className="flex items-center flex-shrink-0">
            <img src={Logo} alt="Company Logo" className="w-10 h-10 mr-3" />
            <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
              MEWZALINE
            </h2>
          </div>

          {/* Center: Links */}
          <div className="hidden md:flex md:space-x-8 flex-grow justify-center">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className="text-black dark:text-white font-inter tracking-wider uppercase text-md whitespace-nowrap hover:underline"
                aria-label={item.label}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side: Search Bar and Icons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className={`hidden md:flex items-center space-x-2 transition-transform duration-300 ${searchOpen ? "max-w-xs" : "max-w-0 overflow-hidden"}`}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="px-4 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
              aria-label={searchOpen ? "Close search" : "Open search"}
            >
              <SearchIcon />
            </button>

            <NavLink
              to={"/cart"}
              className="px-2 py-2 rounded-md shadow hover:bg-gray-600"
              aria-label="View cart"
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon className="dark:text-white" />
              </Badge>
            </NavLink>
            <button
              onClick={toggleTheme}
              className="px-2 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
              aria-label="Toggle dark mode"
            >
              <DarkModeIcon />
            </button>
            {user ? (
              <div className="flex items-center space-x-2">
                <NavLink
                  to={"/dashboard"}
                  className="flex items-center space-x-1 px-2 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
                  aria-label="Dashboard"
                >
                  <AccountCircleIcon />
                  <span>{user.username}</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-2 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
                  aria-label="Logout"
                >
                  <LogoutIcon />
                </button>
              </div>
            ) : (
              <NavLink
                to={"/login"}
                className="px-2 py-2 text-blue-600 rounded-md shadow hover:bg-gray-600 dark:text-white"
                aria-label="Login"
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
              aria-label={navbarOpen ? "Close menu" : "Open menu"}
            >
              {navbarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`transition-[max-height] duration-700 ease-in-out overflow-hidden ${navbarOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} md:opacity-100 md:max-h-full md:hidden`}>
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className="text-black dark:text-white font-inter tracking-wider uppercase text-md whitespace-nowrap hover:underline"
                aria-label={item.label}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex items-center space-x-2">
              <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md shadow hover:bg-gray-600 dark:text-white"
                  aria-label="Submit search"
                >
                  <SearchIcon />
                </button>
              </form>
            </div>
            <NavLink
              to={"/cart"}
              className="block px-4 py-2 text-center text-blue-600 rounded-md shadow hover:bg-gray-800"
              aria-label="View cart"
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon className="dark:text-white" />
              </Badge>
            </NavLink>
            <button
              onClick={toggleTheme}
              className="block px-4 py-2 text-center rounded-md shadow hover:bg-gray-800 dark:text-white"
              aria-label="Toggle dark mode"
            >
              <DarkModeIcon />
            </button>
            {user ? (
              <>
                <NavLink
                  to={"/dashboard"}
                  className="flex items-center space-x-1 px-4 py-2 rounded-md shadow hover:bg-gray-800 dark:text-white"
                  aria-label="Dashboard"
                >
                  <AccountCircleIcon />
                  <span>{user.username}</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-center rounded-md shadow hover:bg-gray-800 dark:text-white"
                  aria-label="Logout"
                >
                  <LogoutIcon />
                </button>
              </>
            ) : (
              <NavLink
                to={"/login"}
                className="block px-4 py-2 text-center rounded-md shadow hover:bg-gray-800 dark:text-white"
                aria-label="Login"
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
