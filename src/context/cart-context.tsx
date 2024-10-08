import React, { createContext, useState, useContext, useEffect } from "react";
import { products } from "../Data/products";
import { useUser } from "../context/user-context"; // Import the user context

// Define the shape of the context
interface ShopContextType {
  cartItems: Record<number, number>;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  updateCartItemCount: (newAmount: number, itemId: number) => void;
  getTotalCartAmount: () => number;
  setCartItems: React.Dispatch<React.SetStateAction<Record<number, number>>>; // Add setCartItems to the context type
}

// Create the context with default values
export const ShopContext = createContext<ShopContextType>({
  cartItems: {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemCount: () => {},
  getTotalCartAmount: () => 0,
  setCartItems: () => {}, // Provide a default no-op function
});

// Custom hook to use the cart context
export const useCart = () => useContext(ShopContext);

// Function to get the default cart structure
const getDefaultCart = (): Record<number, number> => {
  return {}; // Start with an empty cart
};

// Cart context provider component
const CartContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [cartItems, setCartItems] = useState<Record<number, number>>(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : getDefaultCart();
  });

  const { user } = useUser(); // Get the user from the user context

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
      alert("You must be logged in to add items to the cart.");
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
    setCartItems // Include setCartItems in the context value
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default CartContextProvider;
