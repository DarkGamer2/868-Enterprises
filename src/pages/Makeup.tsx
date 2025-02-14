import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { products } from '../Data/products';
import Product from '../components/Product';
import { useTheme } from '../context/theme/ThemeContext';

const Makeup = () => {
    const { theme } = useTheme();

    return (
        <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <NavigationBar />
            <main className={`flex-grow ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
                <div className='text-center dark:text-white'>Makeup</div>
                <section className='grid grid-cols-3 gap-4'>
                    {products.map((product) => {
                        if (product.category === "makeup") {
                            return (
                                <Product
                                    key={product.id} // Make sure to add a unique key for each product
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
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Makeup;
