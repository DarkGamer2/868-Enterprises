import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext with a default value
const AuthContext = createContext<null | {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}>(null);

// Create a provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // A function to simulate logging in
  const login = () => {
    setIsLoggedIn(true);
    navigate("/"); // Redirect to home or any other page after login
  };

  // A function to simulate logging out
  const logout = () => {
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};