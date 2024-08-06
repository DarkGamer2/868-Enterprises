import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { products } from "../Data/products";
import Product from "../components/Product";
import { useTheme } from "../context/theme/ThemeContext";

const HouseholdItems = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <NavigationBar />
      <div className="text-center font-inter text-xl">
        <h1>Household Items</h1>
      </div>
      <div className={`flex-grow ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
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
