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
  const [productImages, setProductImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const API_URL = process.env.REACT_APP_API_URL; // Use environment variable for API URL

    try {
      // Validate price
      const priceValue = parseFloat(productPrice);
      if (isNaN(priceValue) || priceValue <= 0) {
        throw new Error("Please enter a valid price greater than zero.");
      }

      const imageUrls = [];
      for (const image of productImages) {
        const formData = new FormData();
        formData.append("file", image);

        const imageUploadResponse = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrls.push(imageUploadResponse.data.file);
      }

      await axios.post(`${API_URL}/api/:id/products/addProduct`, {
        productName,
        productPrice: priceValue,
        productDescription,
        productImages: imageUrls,
      });

      setSuccessMessage("Product added successfully!");
      // Reset form
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductImages([]);
    } catch (error) {
      console.error("Error uploading product", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Error uploading product. Please try again.");
      } else {
        setErrorMessage("Error uploading product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <NavigationBar />
      <div className="flex-grow flex justify-center items-center px-4 py-8">
        <div className={`w-full max-w-md p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className="text-xl font-bold mb-6 text-center">Add New Product</h1>

          {/* Success/Error Messages */}
          {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}
          {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}

          <form>
            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="productName">
                Product Name
              </label>
              <input
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:ring-blue-400'}`}
                type="text"
                id="productName"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                aria-label="Product Name"
              />
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="productPrice">
                Product Price
              </label>
              <input
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:ring-blue-400'}`}
                type="number"
                id="productPrice"
                required
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                aria-label="Product Price"
                min="0.01"
                step="0.01"
              />
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="productDescription">
                Product Description
              </label>
              <textarea
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:ring-blue-400'}`}
                id="productDescription"
                required
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                aria-label="Product Description"
              />
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="productImages">
                Product Images
              </label>
              <input
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:ring-blue-400'}`}
                type="file"
                id="productImages"
                multiple
                required
                onChange={(e) => {
                  const files = e.target.files ? Array.from(e.target.files) : [];
                  setProductImages(files);
                }}
                aria-label="Product Images"
              />
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-4 px-4 py-2 w-full text-sm font-bold text-white rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
              >
                {loading ? "Adding Product..." : "Add Product"}
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
