import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logError } from "../utils/logger"; // Assume you have a logging utility

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          "https://868-enterprises-api-production.up.railway.app/api/users/logout",
          {},
          { withCredentials: true }
        );
        // Optionally, you can handle any state reset if needed
        navigate("/login");
      } catch (error:any) {
        // Use a logging library or function to log the error
        logError("Logout error: ", error); // Send error to logging system
        // Optionally, you could display a user-friendly message here
        // e.g., show a notification or alert
      }
    };

    logout();
  }, [navigate]); // Ensure navigate is in the dependency array

  return null;
};

export default Logout;
