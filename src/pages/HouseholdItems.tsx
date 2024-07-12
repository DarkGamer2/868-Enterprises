import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../Data/products";
import Product from "../components/Product";
const HouseholdItems = () => {
  return (
    <div>
      <NavigationBar />
      <div>Household Items</div>
      <div>
        {products.map((product) => {
          if (product.category === "household") {
            return (
              <Product
                key={product.id}
                productName={product.itemName}
                productImage={product.itemImage}
                productPrice={product.price.toString()}
                productID={product.id}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <Footer />
    </div>
  );
};

export default HouseholdItems;
