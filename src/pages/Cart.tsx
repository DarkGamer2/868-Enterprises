import { products } from "../Data/products";
import { useContext } from "react";
import { ShopContext } from "../context/cart-context";
import CartItem from "../components/CartItem";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useTheme } from "../context/theme/ThemeContext";


const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const { theme } = useTheme();
   // Get the user's login status

  // const handleCheckout = () => {
  //   if (isLoggedIn) {
  //     navigate("/checkout"); // Replace with your Stripe checkout page route
  //   } else {
  //     navigate("/login");
  //   }
  // };

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
        <div className="mb-4">
          <h2
            className={`text-center text-2xl font-inter ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Cart
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => {
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
            return null; // Add a return statement here to avoid linting errors
          })}
        </div>
        {totalAmount > 0 ? (
          <div className="flex justify-between items-center mt-4">
            <div
              className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Sub Total: ${totalAmount.toFixed(2)}
            </div>
            <div>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 rounded-md px-4 py-2 text-white mx-2"
              >
                Continue Shopping
              </button>
              <button
               
                className="bg-green-600 rounded-md px-4 py-2 text-white"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        ) : (
          <h1
            className={`text-center text-xl font-lato ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Your Cart is Empty
          </h1>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
