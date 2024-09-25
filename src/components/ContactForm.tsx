import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/theme/ThemeContext";
const ContactForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
  const {theme}=useTheme();
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await axios
      .post("https://868-enterprises-api-production.up.railway.app/api/request/quote", {
        firstName,
        lastName,
        email,
        message: "Contact Request from the website", // replace with actual message content
      })
      .then((response) => {
        console.log(response);
        navigate("/confirmed");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send request. Please try again later."); // replace with actual error handling mechanism
      });
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${theme==="dark"?"dark":"light"}`}>
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md dark:bg-black">
        <h1 className="text-center text-2xl font-bold mb-4">Request A Quote</h1>
        <section>
          <form>
            <div className="mb-4">
              <label className="block text-center">First Name:</label>
              <input
                className="w-full border rounded-md p-2 mt-2"
                type="text"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-center">Last Name:</label>
              <input
                className="w-full border rounded-md p-2 mt-2"
                type="text"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-center">Email:</label>
              <input
                className="w-full border rounded-md p-2 mt-2"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-center">Message:</label>
              <textarea
                className="w-full border rounded-md p-2 mt-2"
                placeholder="Please provide a detailed description of your project, any specific features you would like to include, and any budget constraints."
              />
            </div>
            <div className="text-center">
              <button
                className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200"
                type="submit"
                onClick={handleSubmit}
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
