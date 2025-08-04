import NavigationBar from "../../components/NavigationBar";
import Sidebar from "../../components/Sidebar";
import AddIcon from '@mui/icons-material/Add';
import AddProduct from "./AddProduct";
import { useState, useEffect } from "react"; // Added useEffect
import axios from "axios";
import { useTheme } from "../../context/theme/ThemeContext";
type Product={
  _id: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImages: string[];
  productImage:string
}
const Products = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {theme} = useTheme();

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const API_URL="http://localhost:4900"
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/products`); // Assuming your API endpoint is /api/products
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <NavigationBar />
      <div className="flex">
        <Sidebar />
        <div>
          <h1 className="text-center font-bold text-2xl">Your Products</h1>
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center">You currently have no products for sale</p>
          ) : (
            products.map((product:Product) => {
              return (
                <div key={product._id} className="border-2 border-gray-200 p-4 mb-4">
                  <h2>{product.productName}</h2>
                  <p>Price: ${product.productPrice}</p>
                  <p>Description: {product.productDescription}</p>
                  {product.productImage && <img src={product.productImage} alt="Product" width="200" />}
                </div>
              );
            })
          )}
          <div className="text-center">
            <button
              className="bg-red-600 rounded-md px-3 py-2 text-white"
              onClick={handleModal}
            >
              <AddIcon /> Add Product
            </button>
          </div>
        </div>
      </div>
      <AddProduct openModal={openModal} handleModal={handleModal} />
    </div>
  );
};

export default Products;