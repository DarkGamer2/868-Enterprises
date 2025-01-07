import { Link } from 'react-router-dom';
import { useTheme } from '../context/theme/ThemeContext';
import { CartContext } from '../context/cart-context';
import { useContext } from 'react';

interface ProductProps {
  productName: string;
  productImage: string;
  productPrice: string;
  productID: number;
  styleID: string; // Add this prop to handle style-specific navigation
}

const Product: React.FC<ProductProps> = ({
  productName,
  productImage,
  productPrice,
  productID,
  styleID,
}) => {
  // Access cart items from the Cart Context
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(productID);

  const { theme } = useTheme(); // Access theme from context

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="flex flex-col items-center">
        <img
          src={productImage}
          className="h-20 mb-2 rounded-md mt-2"
          alt={productName}
        />
        <div className="text-center">
          <h1 className="text-lg font-bebasNeue dark:text-white">{productName}</h1>
          <p className="text-sm text-gray-600 dark:text-white">$ {productPrice}</p>
          <div>
            <Link to={`/product/${productID}/style/${styleID}`} className="text-blue-600">
              View Details
            </Link>
          </div>
          <div className="mt-2">
            <button
              onClick={() => cart.addOneToCart(productID)}
              className="px-3 py-2 bg-blue-600 rounded-md text-white font-serif"
            >
              Add To Cart
            </button>
            {productQuantity > 0 && (
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-300">
                Quantity in cart: {productQuantity}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
