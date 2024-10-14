import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Product from "../components/Product";
import { useTheme } from "../context/theme/ThemeContext";
import { products } from "../Data/products";

const MedicalSupplies = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <NavigationBar />
      <main className={`flex-grow ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <h1 className="text-center font-inter text-2xl dark:text-white">Medical Supplies</h1>
        <div className="grid grid-cols-3">
          {products.map((product) => {
            if (product.category === "medical") {
              return (
                <Product
                  key={product.id} // Ensure a unique key for each product
                  productName={product.itemName}
                  productImage={product.itemImage}
                  productPrice={product.price.toString()}
                  productID={product.id}
                  styleID={product.styles && product.styles.default ? product.styles.default.styleName : ''} // Pass styleName instead of the Style object
                />
              );
            }
            return null; // Return null for products that don't match
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicalSupplies;
