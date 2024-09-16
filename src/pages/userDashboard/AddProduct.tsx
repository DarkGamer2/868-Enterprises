import { useState } from "react";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import { useTheme } from "../../context/theme/ThemeContext";

const AddProduct = () => {
  const { theme } = useTheme();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const API_URL = "http://localhost:4900";
    try {
      let imageUrl = "";
      if (productImage) {
        const formData = new FormData();
        formData.append("file", productImage);

        const imageUploadResponse = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = imageUploadResponse.data.file;
      }

      await axios.post(`${API_URL}/api/:id/products/addProduct`, {
        productName,
        productPrice,
        productDescription,
        productImage: imageUrl,
      });

      // Optionally, add success handling here
    } catch (error) {
      console.error("Error uploading product", error);
      // Optionally, add error handling here
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <NavigationBar />
      <div className="flex-grow flex justify-center items-center px-4 py-8">
        <div className={`w-full max-w-md p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className="text-xl font-bold mb-6 text-center">Add New Product</h1>
          <form>
            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Name
              </label>
              <input
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:ring-blue-400'}`}
                type="text"
                name="productName"
                required
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Price
              </label>
              <input
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:ring-blue-400'}`}
                type="number"
                name="productPrice"
                required
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Description
              </label>
              <textarea
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:ring-blue-400'}`}
                name="productDescription"
                required
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Image
              </label>
              <input
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:ring-blue-400'}`}
                type="file"
                name="productImage"
                required
                onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
              />
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 w-full text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
