import { useContext } from 'react';
import { ShopContext } from '../context/cart-context';
import { useTheme } from '../context/theme/ThemeContext';

type cartItemProps = {
  productImage: string,
  productName: string,
  productPrice: number,
  productID: number,
};

const CartItem = (props: cartItemProps) => {
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'} p-4 shadow-sm border-b`}>
      <div className={`flex flex-col md:flex-row items-center md:items-start gap-4 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="flex-shrink-0">
          <img src={props.productImage} className="w-24 h-24 object-cover" alt={props.productName} />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-lg font-semibold">{props.productName}</h1>
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-start">
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
            className={`w-12 text-center border border-gray-300 rounded ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          />
          <button
            onClick={() => addToCart(props.productID)}
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            +
          </button>
        </div>
        <div className="text-center md:text-left">
          <span className="text-lg font-semibold">${(props.productPrice * cartItems[props.productID]).toFixed(2)}</span>
        </div>
        <div className="text-center md:text-left">
          <button
            onClick={() => removeFromCart(props.productID)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;