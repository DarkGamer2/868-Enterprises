import React, { createContext, useState, useContext, useEffect } from "react";
import { products } from "../Data/products";
import { useUser } from "../context/user-context";
import Alert from "../components/Alert";

interface ShopContextType {
  cartItems: Record<number, number>;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  updateCartItemCount: (newAmount: number, itemId: number) => void;
  getTotalCartAmount: () => number;
  setCartItems: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

export const ShopContext = createContext<ShopContextType>({
  cartItems: {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemCount: () => {},
  getTotalCartAmount: () => 0,
  setCartItems: () => {},
});

export const useCart = () => useContext(ShopContext);

const getDefaultCart = (): Record<number, number> => {
  return {}; // Start with an empty cart
};

const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Record<number, number>>(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      const parsedCart = JSON.parse(savedCartItems);
      return Object.fromEntries(
        Object.entries(parsedCart).filter(([key, value]) => 
          products.some(product => product.id === Number(key)) && typeof value === 'number'
        )
      ) as Record<number, number>;
    }
    return getDefaultCart();
  });

  const { user } = useUser();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!user) {
      setCartItems(getDefaultCart());
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const getTotalCartAmount = (): number => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const itemInfo = products.find(product => product.id === Number(itemId));
      return itemInfo ? total + itemInfo.price * quantity : total;
    }, 0);
  };

  const addToCart = (itemId: number): void => {
    if (!user) {
      setAlertMessage("You must be logged in to add items to the cart.");
      setAlertVisible(true);
      return;
    }
    setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: number): void => {
    setCartItems(prev => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 1) - 1 };
      if (updatedCart[itemId] <= 0) delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const updateCartItemCount = (newAmount: number, itemId: number): void => {
    setCartItems(prev => {
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
    setCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
      <Alert
        message={alertMessage}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
    </ShopContext.Provider>
  );
};

export default CartContextProvider;