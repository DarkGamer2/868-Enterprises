import { useContext } from "react";
import { ShopContext } from "../context/cart-context";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/ThemeContext";
interface ProductProps {
  productName: string;
  productPrice: string;
  productImage: string;
  productID: number;
}

const Product: React.FC<ProductProps> = ({
  productName,
  productPrice,
  productImage,
  productID,
}) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[productID];

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
          {" "}
          <Link to={`/product/${productID}`} className="text-blue-600">
            View Details
          </Link>
        </div>
        <button
          onClick={() => addToCart(productID)}
          className="mt-2 px-3 py-2 bg-blue-600 rounded-md text-white font-serif"
        >
          Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </button>
      </div>
    </div>
   </div>
  );
};

export default Product;
