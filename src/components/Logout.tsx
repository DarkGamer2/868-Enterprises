import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          "http://localhost:4900/api/users/logout",
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
