import { createContext, useState, ReactNode } from "react";
import { getProductData } from "../Data/products";

type CartProduct = {
  id: string; // Changed to string
  quantity: number;
};

type CartContextType = {
  items: CartProduct[];
  getProductQuantity: (id: string) => number; // Changed to string
  addOneToCart: (id: string) => void; // Changed to string
  removeOneFromCart: (id: string) => void; // Changed to string
  deleteFromCart: (id: string) => void; // Changed to string
  getTotalCost: () => number;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  getProductQuantity: () => 0,
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => 0,
});

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  // Updated to expect a string for id
  function getProductQuantity(id: string): number {
    const quantity = cartProducts.find((product) => product.id === id)?.quantity;
    return quantity ?? 0;
  }

  // Updated to expect a string for id
  function addOneToCart(id: string): void {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  // Updated to expect a string for id
  function removeOneFromCart(id: string): void {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  // Updated to expect a string for id
  function deleteFromCart(id: string): void {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => currentProduct.id !== id)
    );
  }

  // Updated to expect a string for id and handle product data correctly
  function getTotalCost(): number {
    return cartProducts.reduce((totalCost, cartItem) => {
      const productData = getProductData(cartItem.id);

      // Check if productData is found
      if (!productData) {
        // You could return 0, log an error, or handle it in another way
        console.error(`Product with ID ${cartItem.id} not found.`);
        return totalCost;
      }

      return totalCost + productData.price * cartItem.quantity;
    }, 0);
  }

  const contextValue: CartContextType = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
