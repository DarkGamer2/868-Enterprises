import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CartContext } from "../context/cart-context";
import NavigationBar from "../components/NavigationBar";
import { useTheme } from "../context/theme/ThemeContext";
import Footer from "../components/Footer";

const stripePromise = loadStripe("your-stripe-public-key");

const steps = [
  { title: "YOUR INFO" },
  { title: "SELECT LOCATION" },
  { title: "SUMMARY" },
];

export default function CheckoutForm() {
  const cart = useContext(CartContext);
  const [step, setStep] = useState(0);
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    location: "",
  });
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState<string>("");
  const locations = ["Port of Spain", "San Fernando", "Chaguanas", "Arima"];

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://localhost:4900/api/csrf-token", { withCredentials: true });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const nextStep = () => setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : prev));

  const handleLocationChange = (event: any) => {
    setFormData({ ...formData, location: event.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const stripe = await stripePromise;

    const mobileNumberRegex = /^[0-9]{10}$/;
    if (!mobileNumberRegex.test(formData.mobileNumber)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setMobileError("");

    if (!csrfToken) {
      console.error("CSRF token not available.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4900/api/session",
        {
          items: cart.items.map((item) => ({
            name: item.itemName,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          email: "test@example.com", // Replace with user's email if available
          phone_number: formData.mobileNumber,
          shipping_address: { city: formData.location },
        },
        { headers: { "X-CSRF-Token": csrfToken, "Content-Type": "application/json" }, withCredentials: true }
      );
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} transition-colors duration-300`}>
      <NavigationBar />
      <div className={`flex items-center justify-center min-h-screen p-4 ${theme==="dark"?"dark":"light"}`}>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 flex flex-col md:flex-row w-full max-w-5xl transition-all duration-300">
          <div className="md:w-1/3 bg-blue-600 text-white p-6 rounded-xl">
            <ul>
              {steps.map((s, index) => (
                <li key={index} className="flex items-center mb-4">
                  <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full border-2 transition-all ${step === index ? "bg-blue-300 border-blue-300 text-blue-900" : "border-white text-white"}`}>
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <p className="text-xs uppercase opacity-70">Step {index + 1}</p>
                    <p className="font-bold tracking-wide">{s.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="md:w-2/3 p-6">
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold dark:text-white">Personal Info</h2>
                <input type="text" placeholder="Full Name" className="border p-2 w-full mt-2 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                <input type="tel" placeholder="Mobile Number" className="border p-2 w-full mt-2 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} />
                {mobileError && <p className="text-red-500 text-sm mt-2">{mobileError}</p>}
              </div>
            )}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold dark:text-white">Select Location</h2>
                <select className="border p-2 w-full mt-2 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white" value={formData.location} onChange={handleLocationChange}>
                  <option value="">-- Select a Location --</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            )}
            {step === steps.length - 1 && (
              <div>
                <h2 className="text-xl font-bold dark:text-white">Order Summary</h2>
                <ul>
                  {cart.items.map((item, index) => (
                    <li key={index}>{item.itemName} - ${item.price.toFixed(2)}</li>
                  ))}
                </ul>
                <p className="mt-2 font-bold dark:text-white">Total: ${cart.getTotalCost().toFixed(2)}</p>
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 focus:outline-none w-full" onClick={handleSubmit}>
                  Proceed to Payment
                </button>
              </div>
            )}
            <div className="flex justify-between mt-6">
              {step > 0 && <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={prevStep}>Go Back</button>}
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none" onClick={nextStep}>
                {step === steps.length - 1 ? "Confirm" : "Next Step"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}