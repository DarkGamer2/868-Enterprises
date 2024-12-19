// filepath: /Users/kameer/Documents/MEWZALINE/868-Enterprises/src/redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products } from '../Data/products';

interface CartState {
  cartItems: Record<number, number>;
}

const initialState: CartState = {
  cartItems: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      if (state.cartItems[itemId]) {
        state.cartItems[itemId] -= 1;
        if (state.cartItems[itemId] <= 0) {
          delete state.cartItems[itemId];
        }
      }
    },
    updateCartItemCount: (state, action: PayloadAction<{ itemId: number; newAmount: number }>) => {
      const { itemId, newAmount } = action.payload;
      if (newAmount <= 0) {
        delete state.cartItems[itemId];
      } else {
        state.cartItems[itemId] = newAmount;
      }
    },
    setCartItems: (state, action: PayloadAction<Record<number, number>>) => {
      state.cartItems = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemCount, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartAmount = (state: CartState): number => {
  return Object.entries(state.cartItems).reduce((total, [itemId, quantity]) => {
    const itemInfo = products.find(product => product.id === Number(itemId));
    return itemInfo ? total + itemInfo.price * quantity : total;
  }, 0);
};