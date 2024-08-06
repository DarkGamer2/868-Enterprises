import { products } from "../Data/products";
import Product from "./Product";
import { useTheme } from "../context/theme/ThemeContext";
const ProductList = () => {
  const { theme } = useTheme(); // Access theme from context
  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="grid grid-cols-3 gap-4 dark:bg-black">
      {products.slice(0,3).map((product, key) => {
        return (
          <div key={key}>
            <Product
              productName={product.itemName}
              productImage={product.itemImage}
              productPrice={product.price.toString()}
              productID={product.id}
            />
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default ProductList;