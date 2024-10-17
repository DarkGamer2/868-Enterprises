import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/theme/ThemeContext";
import { logError } from "../utils/logger"; // Custom logging utility

const ContactForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // State for error messages

  const navigate = useNavigate();
  const { theme } = useTheme();

  const validateForm = () => {
    if (!firstName || !lastName || !email || !message) {
      return "All fields are required.";
    }
    // Add additional validation as needed (e.g., email format)
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post(
        "https://868-enterprises-api-production.up.railway.app/api/request/quote",
        {
          firstName,
          lastName,
          email,
          message,
        },
        { withCredentials: true }
      );
      navigate("/confirmed");
    } catch (error:any) {
      logError("Contact form submission error: ", error);
      setError("Failed to send request. Please try again later."); // Update state with error
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md dark:bg-black">
        <h1 className="text-center text-2xl font-bold mb-4">Request A Quote</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Display error message */}
        <section>
          <form onSubmit={handleSubmit}> {/* Use onSubmit for better form handling */}
            <div className="mb-4">
              <label className="block text-center">First Name:</label>
              <input
                className="w-full border rounded-md p-2 mt-2"
                type="text"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName} // Controlled component
                required // HTML5 required attribute
              />
            </div>
            <div className="mb-4">
              <label className="block text-center">Last Name:</label>
              <input
                className="w-full border rounded-md p-2 mt-2"
                type="text"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName} // Controlled component
                required // HTML5 required attribute
              />
            </div>
            <div className="mb-4">
              <label className="block text-center">Email:</label>
              <input
                className="w-full border rounded-md p-2 mt-2"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email} // Controlled component
                required // HTML5 required attribute
              />
            </div>
            <div className="mb-4">
              <label className="block text-center">Message:</label>
              <textarea
                className="w-full border rounded-md p-2 mt-2"
                placeholder="Please provide a detailed description of your project, any specific features you would like to include, and any budget constraints."
                onChange={(e) => setMessage(e.target.value)}
                value={message} // Controlled component
                required // HTML5 required attribute
              />
            </div>
            <div className="text-center">
              <button
                className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactForm;
