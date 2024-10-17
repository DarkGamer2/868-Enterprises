import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/cart-context";
import CartItem from "../components/CartItem";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useTheme } from "../context/theme/ThemeContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "../context/user-context";
import { products } from "../Data/products";

// Define the shape of the cart items
interface CartItems {
  [key: string]: number;
}

// Define the shape of a product
interface Product {
  id: number;
  itemName: string;
  price: number;
  itemImage: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalCartAmount, setCartItems } = useContext(ShopContext) as {
    cartItems: CartItems; // Specify the type here
    getTotalCartAmount: () => number;
    setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  };

  const totalAmount = getTotalCartAmount();
  const { theme } = useTheme();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setCartItems({});
    }
  }, [user, setCartItems]);

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

    const filteredItemsArray = Object.keys(cartItems)
      .filter(key => cartItems[key] > 0)
      .map(key => {
        const product = products.find(p => p.id === Number(key)) as Product | undefined;
        if (!product) {
          throw new Error(`Product with id ${key} not found`);
        }
        return {
          id: key,
          name: product.itemName,
          price: product.price,
          image: product.itemImage,
          quantity: cartItems[key],
        };
      });

    const orderDetails = {
      items: filteredItemsArray,
      totalAmount: totalAmount,
    };

    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/checkout`, orderDetails);
      if (response.status === 200) {
        const stripe = await stripePromise;
        const session = response.data;
        const result = await stripe?.redirectToCheckout({ sessionId: session.id });

        if (result?.error) {
          setError(result.error.message || "An unknown error occurred");
        }
      } else {
        setError("Failed to process order");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setError("An error occurred during checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasItemsInCart = Object.values(cartItems).some(quantity => quantity > 0);

  return (
    <div className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <NavigationBar />
      <main className={`flex-grow container mx-auto p-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
        <div className="mb-4">
          <h2 className={`text-center text-2xl font-inter ${theme === "dark" ? "text-white" : "text-black"}`}>
            Cart
          </h2>
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="grid grid-cols-1 gap-4">
          {hasItemsInCart ? (
            products.map((product: Product) => {
              if (cartItems[product.id] !== 0) {
                return (
                  <CartItem
                    key={product.id}
                    productImage={product.itemImage}
                    productName={product.itemName}
                    productPrice={product.price}
                    productID={product.id}
                  />
                );
              }
              return null;
            })
          ) : (
            <h1 className={`text-center text-xl font-lato ${theme === "dark" ? "text-white" : "text-black"}`}>
              Your Cart is Empty
            </h1>
          )}
        </div>
        {totalAmount > 0 ? (
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className={`text-xl font-bold mb-4 md:mb-0 ${theme === "dark" ? "text-white" : "text-black"}`}>
              Sub Total: ${totalAmount.toFixed(2)}
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded-md disabled:opacity-50"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
