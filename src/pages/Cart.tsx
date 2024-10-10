import { products } from "../Data/products";
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/cart-context";
import CartItem from "../components/CartItem";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useTheme } from "../context/theme/ThemeContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "../context/user-context"; // Import the user context

// Define the product type
interface Product {
  id: number;
  itemName: string;
  price: number;
  itemImage: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalCartAmount, setCartItems }: { cartItems: { [key: string]: number }, getTotalCartAmount: () => number, setCartItems: React.Dispatch<React.SetStateAction<Record<number, number>>> } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const { theme } = useTheme();
  const { user } = useUser(); // Get the user from the user context

  useEffect(() => {
    if (!user) {
      setCartItems({}); // Clear the cart if the user is not authenticated
    }
  }, [user, setCartItems]);

  const handleCheckout = async () => {
    if (!user) {
      // If the user is not logged in, redirect to the login page
      navigate("/login");
      return;
    }

    const stripe = await loadStripe("pk_test_51LvjnYHW5YE4EViBNjQImvpkVx37UgqZ8vMewcEGR49N2TStdkPptMhaSzLAbApIwLZTHau3qgAChfFI1sf207Zi00APfXLcEu");

    // Create an array of products with necessary data, using correct type checks
    const filteredItemsArray = Object.keys(cartItems)
      .filter(key => cartItems[key] > 0)  // Filter out items with quantity 0
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

    console.log("Order Details", orderDetails);

    try {
      const response = await axios.post("https://868-enterprises-api-production.up.railway.app/api/checkout", orderDetails);
      if (response.status === 200) {
        const session = response.data;
        const result = await stripe?.redirectToCheckout({
          sessionId: session.id,
        });

        if (result?.error) {
          console.error("Stripe error:", result.error.message);
        }
      } else {
        console.error("Failed to process order");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const hasItemsInCart = Object.values(cartItems).some((quantity) => quantity > 0);

  return (
    <div
      className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <NavigationBar />
      <main
        className={`flex-grow container mx-auto p-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}
      >
        <div className="mb-4">
          <h2
            className={`text-center text-2xl font-inter ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            Cart
          </h2>
        </div>
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
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
                onClick={handleCheckout}
              >
                Checkout
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
