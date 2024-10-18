import React, { createContext, useState, useContext, useEffect } from "react";
import { products } from "../Data/products";
import { useUser } from "../context/user-context"; // Import the user context
import Alert from "../components/Alert";

interface ShopContextType {
  cartItems: Record<number, number>;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  updateCartItemCount: (newAmount: number, itemId: number) => void;
  getTotalCartAmount: () => number;
  setCartItems: React.Dispatch<React.SetStateAction<Record<number, number>>>; // Add setCartItems to the context type
}

export const ShopContext = createContext<ShopContextType>({
  cartItems: {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemCount: () => {},
  getTotalCartAmount: () => 0,
  setCartItems: () => {}, // Provide a default no-op function
});

export const useCart = () => useContext(ShopContext);

const getDefaultCart = (): Record<number, number> => {
  return {}; // Start with an empty cart
};

const CartContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [cartItems, setCartItems] = useState<Record<number, number>>(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : getDefaultCart();
  });

  const { user } = useUser(); // Get the user from the user context
  const [alertVisible, setAlertVisible] = useState(false); // Add state for alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message

  useEffect(() => {
    if (!user) {
      setCartItems(getDefaultCart()); // Clear the cart if the user is not authenticated
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId: number): void => {
    if (!user) {
      setAlertMessage("You must be logged in to add items to the cart.");
      setAlertVisible(true); // Show the alert
      return;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: number): void => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updatedCart[itemId] <= 0) delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const updateCartItemCount = (newAmount: number, itemId: number): void => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: newAmount };
      if (updatedCart[itemId] <= 0) delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const contextValue: ShopContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    setCartItems, // Include setCartItems in the context value
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
      <Alert
        message={alertMessage}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)} // Hide the alert when closed
      />
    </ShopContext.Provider>
  );
};

export default CartContextProvider;
