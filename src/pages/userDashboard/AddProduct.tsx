"use client";
import { useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/theme/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {  FaSpinner } from "react-icons/fa";

const AddProduct = ({ openModal, handleModal }: { openModal: boolean; handleModal: () => void }) => {
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
      
        const API_URL = "http://localhost:4900";
      
        async function getCsrfToken(): Promise<string> {
          try {
            const response = await axios.get(`${API_URL}/api/csrf-token`, {
              withCredentials: true,
            });
            return response.data.csrfToken;
          } catch (error) {
            console.error("Error fetching CSRF token", error);
            setErrorMessage("Failed to fetch CSRF token.");
            setLoading(false);
            return ""; // Return empty string to prevent further execution
          }
        }
      
        const csrfToken = await getCsrfToken()
        if (!csrfToken) return; // Stop if CSRF token fetch failed
        await new Promise(resolve => setTimeout(resolve, 3000));
        try {
          const priceValue = parseFloat(productPrice);
          if (isNaN(priceValue) || priceValue <= 0) {
            throw new Error("Please enter a valid price greater than zero.");
          }
      
          if (productImages.length !== 1) { // Ensure only one image is selected
            throw new Error("Please select only one image.");
          }
      
          const formData = new FormData();
          formData.append("file", productImages[0]);
      
          const imageUploadResponse = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRF-Token": csrfToken, // Include CSRF token in the request header
            },
            withCredentials: true, // Include credentials if needed
          });
      
          const imageUrl = imageUploadResponse.data.file;
      
          await axios.post(
            `${API_URL}/api/products/addProduct`,
            {
              productName,
              productPrice: priceValue,
              productDescription,
              productImage: imageUrl, // Use single image URL
              //productImages: imageUrls, // remove productImages
            },
            {
              headers: {
                "X-CSRF-Token": csrfToken,
              },
              withCredentials: true,
            }
          );
      
          setSuccessMessage("Product added successfully!");
          setProductName("");
          setProductPrice("");
          setProductDescription("");
          setProductImages([]);
        } catch (error) {
          console.error("Error uploading product", error);
          if (axios.isAxiosError(error)) {
            setErrorMessage(
              error.response?.data?.message || "Error uploading product. Please try again."
            );
          } else {
            setErrorMessage("Error uploading product. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      };

    return (
        <AnimatePresence>
            {openModal && (
                <motion.div
                    className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none"
                >
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-30 pointer-events-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className={`relativeshadow-lg py-4 px-6 rounded-md max-w-md w-full z-10 pointer-events-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-xl font-bold mb-6 text-center">Add New Product</h1>

                        <AnimatePresence>
                            {successMessage && (
                                <motion.div
                                    className="text-green-500 mb-4 text-center"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {successMessage}
                                </motion.div>
                            )}
                            {errorMessage && (
                                <motion.div
                                    className="text-red-500 mb-4 text-center"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {errorMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form>
                            {/* ... (input fields remain the same) ... */}
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

                            <div className="mb-4"><label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="productDescription">
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
                                    <motion.button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className={`mt-4 px-4 py-2 w-full text-sm font-bold text-white rounded-lg flex items-center justify-center gap-2 ${
                                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                        whileTap={{ scale: 0.95 }}
                                        animate={{ scale: loading ? 1.1 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {loading ? (
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                            >
                                                <FaSpinner className="animate-spin" />
                                            </motion.span>
                                        ) : null}
                                        {loading ? "Adding Product..." : "Add Product"}
                                    </motion.button>
                                    <button
                                      type="button"
                                      className="mt-4 px-4 py-2 w-full text-sm font-bold text-white rounded-lg flex items-center justify-center gap-2 bg-red-600"
                                      onClick={handleModal}
                                    >
                                      Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };

    export default AddProduct;
