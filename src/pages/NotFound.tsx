import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { useTheme } from "../context/theme/ThemeContext";
const NotFound = () => {
  const navigate = useNavigate();
  const {theme}=useTheme();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={`${theme==="dark"?"dark":"light"}`}>
      <NavigationBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">404 Not Found</h1>
        <p className="text-lg mb-8 dark:text-white">The page you are looking for does not exist.</p>
        <button
          onClick={handleGoHome}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Go Home
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default NotFound;