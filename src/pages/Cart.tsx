import { useContext } from 'react';
import { CartContext } from '../context/cart-context';
import CartItem from '../components/CartItem';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useTheme } from '../context/theme/ThemeContext';
import { products } from '../Data/products';

const Cart = () => {
  const cart = useContext(CartContext); // Access the CartContext
  const { theme } = useTheme(); // Access theme from context

  const hasItemsInCart = cart.items.length > 0; // Check if there are items in the cart
  const totalAmount = cart.getTotalCost(); // Calculate total cost

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <NavigationBar />
      <main
        className={`flex-grow container mx-auto p-4 ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}
      >
        <div className="mb-4">
          <h2
            className={`text-center text-2xl font-inter ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Cart
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {hasItemsInCart ? (
            cart.items.map((cartItem) => {
              const product = products.find((p) => p.id === cartItem.id);
              if (!product) return null;
              return (
                <CartItem
                  key={product.id}
                  productImage={product.itemImage}
                  productName={product.itemName}
                  productPrice={product.price ?? 0}
                  productID={product.id}
                  onAdd={() => cart.addOneToCart(product.id)}
                  onRemove={() => cart.removeOneFromCart(product.id)}
                  onUpdate={(newAmount: number) => {
                    const currentQuantity = cart.getProductQuantity(product.id);
                    if (newAmount > currentQuantity) {
                      cart.addOneToCart(product.id);
                    } else if (newAmount < currentQuantity) {
                      cart.removeOneFromCart(product.id);
                    }
                  }}
                />
              );
            })
          ) : (
            <h1
              className={`text-center text-xl font-lato ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Your Cart is Empty
            </h1>
          )}
        </div>
        {totalAmount > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div
              className={`text-xl font-bold mb-4 md:mb-0 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Sub Total: ${totalAmount.toFixed(2)}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
