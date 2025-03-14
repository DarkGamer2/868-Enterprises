import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/theme/ThemeContext";
import { useUser } from "../context/user-context";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { theme } = useTheme();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Correct implementation to only fetch CSRF token



    try {
      // Fetch CSRF token
      async function getCsrfToken(): Promise<string> {
        try {
          const response = await axios.get(
            "https://868-enterprises-api-production.up.railway.app/api/csrf-token",
            { withCredentials: true } // Include credentials to receive cookies
          );
          return response.data.csrfToken; // Extract and return the CSRF token
        } catch (error) {
          console.error("Error fetching CSRF token", error);
          throw new Error("Failed to fetch CSRF token.");
        }
      }
      const csrfToken = await getCsrfToken();

      console.log("Sending login request with:", { email, password });
      const response = await axios.post(
        "https://868-enterprises-api-production.up.railway.app/api/users/login",
        { email, password },
        {
          withCredentials: true,
          headers: { 
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        setUser({ username: response.data.username });
        navigate("/");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <NavigationBar />
      <section className={`flex-grow ${theme === "dark" ? "bg-black" : "bg-white"}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className={`w-full max-w-sm p-6 border border-gray-300 rounded shadow-md ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"}`}>
            <h2 className="mb-4 text-3xl font-semibold text-center">Sign-In</h2>
            {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className={`block mb-1 text-sm font-bold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} htmlFor="email">Email or mobile phone number</label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "bg-white border-gray-300 text-black focus:ring-blue-400"}`}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className={`block mb-1 text-sm font-bold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500" : "bg-white border-gray-300 text-black focus:ring-blue-400"}`}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-bold text-center text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign-In
              </button>
            </form>
            <p className="mt-4 text-xs text-center text-gray-600">
              By continuing, you agree to MEWZALINE's Conditions of Use and Privacy Notice.
            </p>
            <div className="mt-4 text-center">
              <a href="#" className="text-xs text-blue-600 hover:underline">Need help?</a>
            </div>
            <div className="mt-4 text-center">
              <NavLink to="/createAccount">
                <button className="text-sm font-bold text-blue-600 hover:underline">
                  Create your MEWZALINE account
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
