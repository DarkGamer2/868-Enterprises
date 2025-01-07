import { useContext } from 'react';
import { CartContext } from '../context/cart-context';
import { useTheme } from '../context/theme/ThemeContext';

type CartItemProps = {
  productImage: string;
  productName: string;
  productPrice: number;
  productID: number;
  onAdd: () => void;
  onRemove: () => void;
  onUpdate: (newAmount: number) => void;
};

const CartItem = (props: CartItemProps) => {
  const cart = useContext(CartContext); // Access CartContext
  const { theme } = useTheme();

  const productQuantity = cart.getProductQuantity(props.productID);

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
            onClick={() => cart.removeOneFromCart(props.productID)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            -
          </button>
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => {
              const newAmount = Number(e.target.value);
              const currentQuantity = cart.getProductQuantity(props.productID);
              if (newAmount > currentQuantity) {
                cart.addOneToCart(props.productID);
              } else if (newAmount < currentQuantity) {
                cart.removeOneFromCart(props.productID);
              }
            }}
            className={`w-12 text-center border border-gray-300 rounded ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          />
          <button
            onClick={() => cart.addOneToCart(props.productID)}
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            +
          </button>
        </div>
        <div className="text-center md:text-left">
          <span className="text-lg font-semibold">${(props.productPrice * productQuantity).toFixed(2)}</span>
        </div>
        <div className="text-center md:text-left">
          <button
            onClick={() => cart.deleteFromCart(props.productID)}
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
