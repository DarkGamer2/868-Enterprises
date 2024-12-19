import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Load Stripe with your publishable key
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Function to handle errors
  const handleError = (error: { message?: string }) => {
    setLoading(false);
    setErrorMessage(error.message || 'An unknown error occurred');
  };

  // Get CSRF token from cookies
  // const csrfToken = document.cookie.match(/XSRF-TOKEN=([^;]*)/)?.[1];

  useEffect(() => {
    // Create a payment intent on component mount
    axios
      .post(
        'http://localhost:4900/api/create-payment-intent',
        { amount: 1000 },
        // { headers: { 'x-csrf-token': csrfToken } } // Adding CSRF token to headers
      )
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => {
        console.error('Error creating payment intent:', err);
        setErrorMessage('Failed to create payment intent.');
      });
  }, []);

  // Stripe options
  const options = {
    clientSecret: clientSecret ?? undefined,
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Ensure Stripe.js and Elements have loaded before submission
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // Confirm the payment with Stripe
    const { error } = await stripe.confirmPayment({
      clientSecret: clientSecret!,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (error) {
      handleError(error);
    } else {
      setLoading(false);
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {clientSecret ? (
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button type="submit" disabled={!stripe || loading}>
            {loading ? 'Processing...' : 'Pay'}
          </button>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </Elements>
  );
}