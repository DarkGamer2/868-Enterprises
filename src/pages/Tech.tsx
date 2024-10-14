import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { products } from "../Data/products";
import Product from "../components/Product";
import { useTheme } from "../context/theme/ThemeContext";

const Tech = () => {
    const { theme } = useTheme();

    return (
        <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <NavigationBar />
            <main className={`flex-grow ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
                <div>
                    <h1 className="text-center dark:text-white">Tech & Electronics</h1>
                </div>
                <div className="grid grid-cols-3">
                    {products.map((product) => {
                        if (product.category === "tech") {
                            return (
                                <Product
                                    key={product.id} // Ensure to add a key prop
                                    productName={product.itemName}
                                    productImage={product.itemImage}
                                    productPrice={product.price.toString()}
                                    productID={product.id}
                                    styleID={product.styles?.default?.styleName || "default"} // Provide a default styleID
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

export default Tech;
