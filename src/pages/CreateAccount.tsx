import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/theme/ThemeContext";

const CreateAccount = () => {
  const { theme } = useTheme(); 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreatingAccount(true);
    
    try {
      await axios.post("http://localhost:4900/api/users/register", {
        fullName,
        email,
        username,
        password,
      });
      
      // Navigate to login page
      navigate("/login");
      console.log("Navigation successful");
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setCreatingAccount(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <NavigationBar />
      <section className={`flex-grow ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
          <div className={`w-full max-w-sm p-6 border rounded shadow-md ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
            <h2 className="mb-4 text-3xl font-semibold text-center">
              Create Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Full Name:</label>
                <input
                  className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-black focus:ring-blue-400'}`}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email:</label>
                <input
                  className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-black focus:ring-blue-400'}`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Username:</label>
                <input
                  className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-black focus:ring-blue-400'}`}
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Password:</label>
                <input
                  className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-black focus:ring-blue-400'}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-bold text-center text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {creatingAccount ? "Creating Account" : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateAccount;