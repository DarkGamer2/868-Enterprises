import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { products } from "../Data/products";
import Product from '../components/Product';
import { useTheme } from '../context/theme/ThemeContext';

const Clothing = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <NavigationBar />
      <main className={`flex-grow ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <h1 className="text-center dark:text-white">Clothing</h1>
        <div className='grid grid-cols-3'>
          {products.map((product) => {
            if (product.category === "clothing") {
              return (
                <Product
                  key={product.id}
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

export default Clothing;
