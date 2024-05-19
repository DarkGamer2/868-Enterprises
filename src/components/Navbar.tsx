import DarkModeIcon from "@mui/icons-material/DarkMode";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
interface navProps {
  NavLink: React.ElementType;
}
const NavigationBar = () => {
  const [navbaropen, setNavBarOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const darkModeSwitch = () => {
    setDarkMode(true);
  };
  return (
    <div className={`w-full shadow ${darkMode ? "dark" : ""}`}>
      <nav className="">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* <img
              src={Logo}
              alt="logo"
              className="w-12 h-12 items-center justify-center"
            /> */}
              <h2 className="text-blue-600 font-inter">
                868 Enterprises
              </h2>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavBarOpen(!navbaropen)}
                >
                  {navbaropen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbaropen ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-black font-inter tracking-wider  uppercase text-md ">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="text-black font-inter tracking-wider  uppercase text-md">
                <NavLink to={"/food"}>Food</NavLink>
              </li>
              <li className="text-black font-inter tracking-wider  uppercase text-md">
                <NavLink to={"/projects"}>Makeup</NavLink>
              </li>
              <li className="text-black font-inter tracking-wider uppercase text-md ">
                <NavLink to={"/contact"}>Clothing</NavLink>
              </li>
              <li className="text-black font-inter tracking-wider  uppercase text-md">
                <NavLink to={"/services"}>Medical Supplies</NavLink>
              </li>
            </ul>
            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              <NavLink
                to={"/cart"}
                className="inline-block px-4 py-2 text-center text-blue-600 rounded-md shadow hover:bg-gray-800"
              >
                <ShoppingCartIcon />
              </NavLink>
              <button
                onClick={darkModeSwitch}
                className="inline-block px-4 py-2 text-center rounded-md shadow hover:bg-gray-800"
              >
                <DarkModeIcon />
              </button>
              <NavLink
                to={"/signin"}
                className="inline-block px-4 py-2 text-center rounded-md shadow hover:bg-gray-800"
              >
                <LoginIcon />
              </NavLink>
            </div>
          </div>
          <div className="hidden space-x-2 md:inline-block">
            <NavLink
              to="*"
              className="px-4 py-2 rounded-md shadow hover:bg-gray-600"
            >
              <ShoppingCartIcon />
            </NavLink>
            <button
              onClick={darkModeSwitch}
              className="px-4 py-2 rounded-md shadow hover:bg-gray-600"
            >
              <DarkModeIcon />
            </button>
            <NavLink
              to="*"
              className="px-4 py-2 text-blue-600 rounded-md shadow hover:bg-gray-600"
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
