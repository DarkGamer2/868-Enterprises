import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@mui/material";
import { useTheme } from "../context/theme/ThemeContext";
import { CartContext } from "../context/cart-context";
import { useUser } from "../context/user-context";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import Logo from "/assets/images/Logo.jpg";
import { products } from "../Data/products";
import { Product } from "../types";

const NavigationBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Update the state type
  const { theme, toggleTheme } = useTheme();
  const { items, deleteFromCart } = useContext(CartContext);
  const { user, setUser } = useUser();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    // Clear the entire cart instead of trying to delete a specific item
    items.forEach(item => deleteFromCart(item.id));
  };

  const filterProducts = (query: string) => {
    if (!query) return setSearchResults([]);
    const filtered = products.filter((product) =>
      product.itemName.toLowerCase().includes(query.toLowerCase()) ||
      product.productDescription.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div className={`w-full shadow ${theme === "dark" ? "dark" : "light"}`}>
      <nav className="dark:bg-black bg-white relative">
        <div className="flex items-center px-4 mx-auto lg:max-w-7xl md:px-8 w-full">
          {/* Left side - Logo and Text */}
          <div className="absolute left-4 flex items-center">
            <img src={Logo} alt="Company Logo" className="w-10 h-10 mr-3" />
            <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
              MEWZALINE
            </h2>
          </div>

          {/* Center - Links and Search Bar */}
          <div className="flex-grow flex justify-center items-center">
            <div className="hidden md:flex md:space-x-8">
              {["Home", "Household Items", "Makeup", "Clothing", "Medical Supplies", "Contact"].map(label => (
                <NavLink
                  key={label}
                  to={label === "Home" ? "/" : `/${label.toLowerCase().replace(/ /g, '')}`}
                  className="text-black dark:text-white font-inter tracking-wider uppercase text-md whitespace-nowrap hover:underline transition-all duration-300 px-3 py-2"
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-64 md:flex hidden ml-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  filterProducts(e.target.value);
                }}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-full"
              />
              <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                <SearchIcon className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* Right side - Dark Mode, Login, Cart */}
          <div className="absolute right-4 flex items-center space-x-4">
            <button onClick={toggleTheme} className="px-2 py-2 rounded-md shadow hover:bg-gray-600">
              <DarkModeIcon className="dark:text-white" />
            </button>
            {user ? (
              <div className="flex items-center space-x-3">
                <NavLink to="/dashboard" className="flex items-center space-x-1 px-3 py-2 rounded-md shadow hover:bg-gray-600">
                  <AccountCircleIcon />
                  <span>{user.username}</span>
                </NavLink>
                <button onClick={handleLogout} className="px-2 py-2 rounded-md shadow hover:bg-gray-600">
                  <LogoutIcon />
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="px-3 py-2 text-blue-600 rounded-md shadow hover:bg-gray-600">
                <LoginIcon />
              </NavLink>
            )}
            <NavLink to="/cart" className="px-2 py-2 rounded-md shadow hover:bg-gray-600">
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon className="dark:text-white" />
              </Badge>
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden absolute right-4 top-4">
            <button className="p-2 text-gray-700 rounded-md" onClick={() => setNavbarOpen(!navbarOpen)}>
              {navbarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Search Results Box */}
        <div
          className={`absolute top-16 left-4 w-64 bg-white shadow-lg rounded-md mt-2 p-2 max-h-60 overflow-y-auto transition-all duration-300 ease-out
            ${searchResults.length > 0 ? "opacity-100 scale-100 z-50" : "opacity-0 scale-95 z-0"}`}
        >
          {searchResults.map((product: Product) => (
            <NavLink key={product.id} to={`/product/${product.id}`} className="block p-2 hover:bg-gray-100">
              {product.itemName}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
