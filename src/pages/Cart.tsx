import { useContext } from 'react';
import { CartContext } from '../context/cart-context';
import CartItem from '../components/CartItem';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useTheme } from '../context/theme/ThemeContext';
import { products } from '../Data/products';
import axios from 'axios';

const Cart = () => {
  const cart = useContext(CartContext); // Access the CartContext
  const { theme } = useTheme(); // Access theme from context

  const hasItemsInCart = cart.items.length > 0; // Check if there are items in the cart
  const totalAmount = cart.getTotalCost(); // Calculate total cost

  // Fetch CSRF token
  const getCsrfToken = async (): Promise<string> => {
    try {
      const response = await axios.get(
        "https://868-enterprises-api-production.up.railway.app/api/csrf-token",
        { withCredentials: true } // Include credentials to receive cookies
      );
      return response.data.csrfToken; // Extract and return the CSRF token
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      throw new Error("Failed to fetch CSRF token.");
    }
  };

  // Handle the checkout process with CSRF token
  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      // Get CSRF token
      const csrfToken = await getCsrfToken();

      // Make checkout request
      const response = await axios.post(
        "https://868-enterprises-api-production.up.railway.app/api/checkout", 
        { items: cart.items },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken, // Add CSRF token to the header
          },
          withCredentials: true, // Ensure cookies are sent along with the request
        }
      );

      const data = response.data;
      if (data.url) {
        window.location.href = data.url; // Redirect to the provided URL if available
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.status, error.response.data);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <NavigationBar />
      <main
        className={`flex-grow container mx-auto p-4 ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}
      >
        <div className="mb-4">
          <h2
            className={`text-center text-2xl font-inter ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Cart
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {hasItemsInCart ? (
            cart.items.map((cartItem) => {
              const product = products.find((p) => p.id === cartItem.id);
              if (!product) return null;
              return (
                <CartItem
                  key={product.id}
                  productImage={product.itemImage}
                  productName={product.itemName}
                  productPrice={product.price ?? 0}
                  productID={product.id}
                  onAdd={() => cart.addOneToCart(product.id)}
                  onRemove={() => cart.removeOneFromCart(product.id)}
                  onUpdate={(newAmount: number) => {
                    const currentQuantity = cart.getProductQuantity(product.id);
                    if (newAmount > currentQuantity) {
                      cart.addOneToCart(product.id);
                    } else if (newAmount < currentQuantity) {
                      cart.removeOneFromCart(product.id);
                    }
                  }}
                />
              );
            })
          ) : (
            <h1
              className={`text-center text-xl font-lato ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Your Cart is Empty
            </h1>
          )}
        </div>
        {totalAmount > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div
              className={`text-xl font-bold mb-4 md:mb-0 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Sub Total: ${totalAmount.toFixed(2)}
            </div>
            <div>
              <button 
                className="text-sm font-bold text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
