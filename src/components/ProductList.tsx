import { products } from "../Data/products";
import Product from "./Product";

const ProductList = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
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
  );
};

export default ProductList;