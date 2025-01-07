import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery";
import StyleSwitcher from "../components/StyleSwitcher";
import { products } from "../Data/products";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { useTheme } from "../context/theme/ThemeContext";
import { Product, Style } from "../types";
import { CartContext } from "../context/cart-context";
import { useContext } from "react";
const ProductDetails: React.FC = () => {
  const { productId, styleId } = useParams<{
    productId: string;
    styleId: string;
  }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const { theme } = useTheme();
  const { addOneToCart } = useContext(CartContext);
  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === productId);

    if (selectedProduct) {
      setProduct(selectedProduct);

      // Retrieve styles safely
      if (selectedProduct.styles) {
        const styleKey = styleId as keyof typeof selectedProduct.styles;

        // Check if style exists
        if (styleKey in selectedProduct.styles) {
          const style = selectedProduct.styles[styleKey] as Style;
          if (style) {
            setSelectedStyle(style);
            setMainImage(style.productImage);
            setAdditionalImages(style.additionalImages || []);
          }
        } else {
          // Use default style if styleId doesn't match
          const defaultStyle = selectedProduct.styles.default as Style;
          if (defaultStyle) {
            setSelectedStyle(defaultStyle);
            setMainImage(defaultStyle.productImage);
            setAdditionalImages(defaultStyle.additionalImages || []);
          }
        }
      }
    }
  }, [productId, styleId]);

  useEffect(() => {
    if (selectedStyle) {
      setMainImage(selectedStyle.productImage);
      setAdditionalImages(selectedStyle.additionalImages || []);
    }
  }, [selectedStyle]);

  const handleStyleSelect = (style: Style) => {
    setSelectedStyle(style); // This should be a valid Style now
  };

  if (!product) return <div>Product not found</div>;

  // Handle undefined values with nullish coalescing
  const isInStock = selectedStyle?.inStock ?? product.inStock;

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen flex flex-col`}
    >
      <NavigationBar />
      <div className="product-details max-w-5xl mx-auto p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-4">
          {selectedStyle ? selectedStyle.styleName : product.itemName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-full">
            <Gallery
              mainImage={mainImage}
              additionalImages={additionalImages}
            />
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Select Style:</h3>
              <StyleSwitcher
                styles={Object.values(product.styles).filter(
                  (style): style is Style => !Array.isArray(style)
                )}
                selectedStyle={selectedStyle}
                onSelectStyle={handleStyleSelect}
              />
            </div>

            <p className="text-lg font-semibold mb-4">
              Price: $
              {selectedStyle
                ? selectedStyle.price.toFixed(2)
                : product.price.toFixed(2)}
            </p>

            <p className="mb-4">
              {selectedStyle
                ? selectedStyle.description
                : product.productDescription}
            </p>

            {product.dimensions && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dimensions: {product.dimensions}
              </p>
            )}

            <span>
              Availability:
              <button
                className={`px-3 py-2 text-white mx-2 my-1 ${
                  isInStock ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {isInStock ? "In Stock" : "Out of Stock"}
              </button>
            </span>

            <div>
              <button
                onClick={() => {
                  if (productId) {
                    addOneToCart(productId);
                  } else {
                    console.error("Product ID is undefined");
                  }
                }}
                className={`px-3 py-2 text-white rounded-md mt-2 ${
                  isInStock ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={!isInStock}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
