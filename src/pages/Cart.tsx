import { products } from '../Data/products';
import { useContext } from 'react';
import { ShopContext } from '../context/cart-context';
import CartItem from '../components/CartItem';
import NavigationBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    return (
        <div className='flex flex-col min-h-screen'>
            <NavigationBar />
            <main className='flex-grow container mx-auto p-4'>
                <div className="mb-4">
                    <h2 className='text-center text-2xl font-bold'>Cart</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {products.map((product) => {
                        if (cartItems[product.id] !== 0) {
                            return (
                                <CartItem
                                    key={product.id}
                                    productImage={product.itemImage}
                                    productName={product.itemName}
                                    productPrice={product.price}
                                    productID={product.id}
                                />
                            )
                        }
                    })}
                </div>
                {totalAmount > 0 ? (
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-xl font-bold">
                            Sub Total: ${totalAmount.toFixed(2)}
                        </div>
                        <div>
                            <button onClick={() => navigate("/")} className='bg-blue-600 rounded-md px-4 py-2 text-white mx-2'>
                                Continue Shopping
                            </button>
                            <button className='bg-green-600 rounded-md px-4 py-2 text-white'>
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <h1 className='text-center text-2xl font-bold'>Your Cart is Empty</h1>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Cart;
