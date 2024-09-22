import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    user: { username: string } | null;
};
const ProtectedRoute=({children,user}:ProtectedRouteProps)=>{
    const navigate=useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }
  return children;
}

export default ProtectedRoute;