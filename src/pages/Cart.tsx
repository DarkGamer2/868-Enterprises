// filepath: /Users/kameer/Documents/MEWZALINE/868-Enterprises/src/pages/Cart.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount } from '../redux/cartSlice';
import CartItem from '../components/CartItem';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useTheme } from '../context/theme/ThemeContext';
import { useUser } from '../context/user-context';
import { products } from '../Data/products';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalAmount = useSelector((state: RootState) => getTotalCartAmount(state.cart));
  const { theme } = useTheme();
  const { user } = useUser();

  const handleAddToCart = (itemId: number) => {
    dispatch(addToCart(itemId));
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateCartItemCount = (newAmount: number, itemId: number) => {
    dispatch(updateCartItemCount({ itemId, newAmount }));
  };

  const hasItemsInCart = Object.values(cartItems).some(quantity => quantity > 0);

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <NavigationBar />
      <main className={`flex-grow container mx-auto p-4 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="mb-4">
          <h2 className={`text-center text-2xl font-inter ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Cart
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {hasItemsInCart ? (
            products.map(product => {
              if (cartItems[product.id] !== 0) {
                return (
                  <CartItem
                    key={product.id}
                    productImage={product.itemImage}
                    productName={product.itemName}
                    productPrice={product.price ?? 0}
                    productID={product.id}
                    onAdd={() => handleAddToCart(product.id)}
                    onRemove={() => handleRemoveFromCart(product.id)}
                    onUpdate={(newAmount: number) => handleUpdateCartItemCount(newAmount, product.id)}
                  />
                );
              }
              return null;
            })
          ) : (
            <h1 className={`text-center text-xl font-lato ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Your Cart is Empty
            </h1>
          )}
        </div>
        {totalAmount > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className={`text-xl font-bold mb-4 md:mb-0 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
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