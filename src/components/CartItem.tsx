import React, { useContext } from 'react';
import { ShopContext } from '../context/cart-context';

type cartItemProps = {
  productImage: string,
  productName: string,
  productPrice: number,
  productID: number,
};

const CartItem = (props: cartItemProps) => {
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  return (
    <div className="grid grid-cols-5 gap-4 items-center bg-white p-4 shadow-sm border-b">
      <div className="col-span-1">
        <img src={props.productImage} className="w-24 h-24 object-cover" alt={props.productName} />
      </div>
      <div className="col-span-1 text-center">
        <h1 className="text-lg font-semibold">{props.productName}</h1>
      </div>
      <div className="col-span-1 text-center">
        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={() => removeFromCart(props.productID)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            -
          </button>
          <input
            type="number"
            value={cartItems[props.productID]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), props.productID)}
            className="w-12 text-center border border-gray-300 rounded"
          />
          <button
            onClick={() => addToCart(props.productID)}
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="col-span-1 text-center">
        <span className="text-lg font-semibold">${(props.productPrice * cartItems[props.productID]).toFixed(2)}</span>
      </div>
      <div className="col-span-1 text-center">
        <button
          onClick={() => removeFromCart(props.productID)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default CartItem;
