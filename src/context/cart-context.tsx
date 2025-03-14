import { createContext, useState, ReactNode } from "react";
import { getProductData } from "../Data/products";

type CartProduct = {
  id: string;
  quantity: number;
  itemName: string;
  price: number;
  image: string; // Add image URL
};

type CartContextType = {
  items: CartProduct[];
  getProductQuantity: (id: string) => number;
  addOneToCart: (id: string) => void;
  removeOneFromCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
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

  function getProductQuantity(id: string): number {
    return cartProducts.find((product) => product.id === id)?.quantity ?? 0;
  }

  function addOneToCart(id: string): void {
    setCartProducts((prev) => {
      const exists = prev.find((product) => product.id === id);
      const productData = getProductData(id); // Fetch product details

      if (!productData) return prev; // Ensure product data is valid

      return exists
        ? prev.map((product) =>
            product.id === id ? { ...product, quantity: product.quantity + 1 } : product
          )
        : [
            ...prev,
            {
              id,
              quantity: 1,
              itemName: productData.itemName,
              price: productData.price,
              image: productData.image, // Include image URL
            },
          ];
    });
  }

  function removeOneFromCart(id: string): void {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(product.quantity - 1, 0) } : product
      )
    );
  }

  function deleteFromCart(id: string): void {
    setCartProducts((prev) => prev.filter((product) => product.id !== id));
  }

  function getTotalCost(): number {
    return cartProducts.reduce((totalCost, cartItem) => {
      const productData = getProductData(cartItem.id);
      return productData ? totalCost + productData.price * cartItem.quantity : totalCost;
    }, 0); // Removed deliveryFee
  }

  const contextValue: CartContextType = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export default CartProvider;