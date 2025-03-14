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

  const hasItemsInCart = cart.items.length > 0;
  const totalAmount = cart.getTotalCost();

  const navigate=useNavigate();

  // Fetch CSRF token once on component mount
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

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();

    navigate("/checkout-form");
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <NavigationBar />
      <main className={`flex-grow container mx-auto p-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
        <h2 className="text-center text-2xl font-bold">Cart</h2>

        <div className="grid grid-cols-1 gap-4">
          {hasItemsInCart ? (
            cart.items.map((cartItem) => {
              const product = products.find((p) => p.id === cartItem.id);
              return product ? (
                <CartItem
                  key={product.id}
                  productImage={product.image}
                  productName={product.itemName}
                  productPrice={product.price ?? 0}
                  productID={product.id}
                  onAdd={() => cart.addOneToCart(product.id)}
                  onRemove={() => cart.removeOneFromCart(product.id)}
                  onUpdate={(newAmount) => {
                    const currentQuantity = cart.getProductQuantity(product.id);
                    if (newAmount > currentQuantity) cart.addOneToCart(product.id);
                    else if (newAmount < currentQuantity) cart.removeOneFromCart(product.id);
                  }}
                />
              ) : null;
            })
          ) : (
            <h1 className="text-center text-xl">Your Cart is Empty</h1>
          )}
        </div>

        {/* Conditionally show the form only if there are items in the cart */}
        {hasItemsInCart && (
          <>

            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
              <div className="text-xl font-bold mb-4 md:mb-0">Sub Total: ${totalAmount.toFixed(2)}</div>
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

