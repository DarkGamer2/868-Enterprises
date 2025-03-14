import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/ThemeContext";
const Cancel = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${theme==="dark"?"dark":"light"}`}>
      <NavigationBar />
      <div className="flex flex-col items-center justify-center flex-grow px-4 text-center dark:bg-black">
        <h1 className="text-4xl font-extrabold text-red-600">Order Cancelled</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-md dark:text-white">
          Your order has been cancelled. If you need assistance, please contact our support team.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/">
            <button className="px-6 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              Return to Home
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cancel;
