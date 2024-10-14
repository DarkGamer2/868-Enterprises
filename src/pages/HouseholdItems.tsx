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
      <div className="text-center font-inter text-xl mb-4">
        <h1>Household Items</h1>
      </div>
      <div className={`flex-grow ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map((product) => {
            if (product.category === "household") {
              return product.styles ? Object.keys(product.styles).map((styleKey) => {
                const style = product.styles?.[styleKey as keyof typeof product.styles];
                
                if (style && typeof style !== 'string' && !Array.isArray(style)) {
                  return (
                    <Product
                      key={`${product.id}-${styleKey}`}
                      productName={`${product.itemName} - ${style.styleName}`}
                      productImage={style.productImage}
                      productPrice={style.price.toString()}
                      productID={product.id}
                      styleID={styleKey} // Pass the styleKey to Product
                    />
                  );
                }
                return null;
              }) : null;
            }
            return null;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HouseholdItems;
