import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/cart-context";
import CartItem from "../components/CartItem";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { useTheme } from "../context/theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { products } from "../Data/products";
import axios from "axios";

// Locations array
const locations = ["Port of Spain", "San Fernando", "Chaguanas", "Arima"];

const Cart = () => {
  const cart = useContext(CartContext);
  const { theme } = useTheme();
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>(locations[0]); // Default to first location
  const [shippingFee, setShippingFee] = useState<number>(0);

  const hasItemsInCart = cart.items.length > 0;
  const totalAmount = cart.getTotalCost();

  const navigate = useNavigate();

  // Fetch CSRF token once on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          "https://868-enterprises-api-production.up.railway.app/api/csrf-token",
          { withCredentials: true }
        );
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  // Update shipping fee when location changes
  useEffect(() => {
    const fetchShippingFee = async () => {
      try {
        await cart.updateDeliveryFee(selectedLocation);
        setShippingFee(cart.deliveryFee);
      } catch (error) {
        console.error("Failed to fetch shipping fee:", error);
      }
    };
    fetchShippingFee();
  }, [selectedLocation, cart]);

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!csrfToken) {
      console.error("CSRF token is missing.");
      return;
    }

    try {
      // Example checkout request (replace with your actual API endpoint and data)
      await axios.post(
        "YOUR_CHECKOUT_API_ENDPOINT",
        {
          items: cart.items,
          totalAmount: totalAmount + shippingFee,
          location: selectedLocation,
          shippingFee: shippingFee,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );

      navigate("/checkout-success"); // Redirect on success
    } catch (error) {
      console.error("Checkout failed:", error);
      // Handle checkout error (e.g., show error message)
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <NavigationBar />
      <main
        className={`flex-grow container mx-auto p-4 ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <h2 className="text-center text-2xl font-bold">Cart</h2>

        <div className="grid grid-cols-1 gap-4">
          {hasItemsInCart ? (
            cart.items.map((cartItem) => {
              const product = products.find((p) => p.id === cartItem.id);
              return product ? (
                <CartItem
                  key={product.id}
                  productImage={product.itemImage}
                  productName={product.itemName}
                  productPrice={product.price ?? 0}
                  productID={product.id}
                  onAdd={() => cart.addOneToCart(product.id)}
                  onRemove={() => cart.removeOneFromCart(product.id)}
                  onUpdate={(newAmount) => {
                    const currentQuantity = cart.getProductQuantity(product.id);
                    if (newAmount > currentQuantity)
                      cart.addOneToCart(product.id);
                    else if (newAmount < currentQuantity)
                      cart.removeOneFromCart(product.id);
                  }}
                />
              ) : null;
            })
          ) : (
            <h1 className="text-center text-xl">Your Cart is Empty</h1>
          )}
        </div>

        {hasItemsInCart && (
          <>
            <div className="mt-4">
              <label htmlFor="location" className="block text-sm font-medium">
                Select Location:
              </label>
              <select
                id="location"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
              <div className="text-xl font-bold mb-4 md:mb-0">
                Sub Total: ${totalAmount.toFixed(2)}
              </div>
              <div className="text-xl font-bold mb-4 md:mb-0">
                Shipping: ${shippingFee.toFixed(2)}
              </div>
              <div className="text-xl font-bold mb-4 md:mb-0">
                Total: ${(totalAmount + shippingFee).toFixed(2)}
              </div>
              <button
                className="text-sm font-bold text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;