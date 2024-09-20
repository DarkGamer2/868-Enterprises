import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import NavigationBar from "../components/NavigationBar";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe("your-publishable-key-here");
const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message || "An error occurred");
      setLoading(false);
    } else {
      setError(null);
      console.log("PaymentMethod:", paymentMethod);
      // Handle successful payment method creation here
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="bg-white p-8 rounded-md shadow-md w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <CardElement className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={!stripe || loading} onClick={handleSubmit}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Pay Now"}
        </button>
        <div className="text-center">
          <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500" onClick={goBack}>
            Go Back
          </button>
        </div>
      </form>
    </section>
  );
};

const CheckoutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <Elements stripe={stripePromise}>
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
};

export default CheckoutPage;
