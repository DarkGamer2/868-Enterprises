import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/auth-context"; // Adjust the path accordingly

const Layout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default Layout;
