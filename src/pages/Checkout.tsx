import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import NavigationBar from "../components/NavigationBar";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

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
      setError("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card information is not available.");
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message || "An error occurred while processing your payment.");
      setLoading(false);
    } else {
      setError(null);
      console.log("PaymentMethod:", paymentMethod);
      // TODO: Handle successful payment confirmation (e.g., send paymentMethod.id to your backend)

      // Redirect to a success page after payment
      navigate("/payment-success");
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
          <CardElement
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            options={{
              style: {
                base: {
                  color: "#32325d",
                  fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                  fontSmoothing: "antialiased",
                  fontSize: "16px",
                  lineHeight: "24px",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
            }}
          />
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={!stripe || loading}
          onClick={handleSubmit}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Pay Now"}
        </button>
        <div className="text-center">
          <button
            type="button"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            onClick={goBack}
          >
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
