import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    };
    logout();
  }, );

  return null;
};

export default Logout;
