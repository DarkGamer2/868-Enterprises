import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from '../components/Gallery';  // Import the Gallery component
import StyleSwitcher from '../components/StyleSwitcher'; // Import the StyleSwitcher component
import { products } from '../Data/products';  // Import your products data
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useTheme } from '../context/theme/ThemeContext';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()!;  // Retrieve productId from URL
  const [product, setProduct] = useState<any>(null);        // Holds the product data
  const [selectedStyle, setSelectedStyle] = useState<any>(null);  // Holds the currently selected style
  const [mainImage, setMainImage] = useState<string>('');    // Holds the current main image for the gallery
  const { theme } = useTheme();  // Use the theme context
  
  // Fetch the product based on the productId from the URL
  useEffect(() => {
    const selectedProduct = products.find((product) => product.id === parseInt(productId!));

    if (selectedProduct) {
      setProduct(selectedProduct);

      // Set the first available style as the default style, if styles exist
      const initialStyle = selectedProduct.styles ? Object.values(selectedProduct.styles)[0] : null;
      setSelectedStyle(initialStyle);

      // Default the main image to the product's main image or the first style image if available
      setMainImage(selectedProduct.itemImage || (initialStyle && initialStyle.productImage) || '');
    }
  }, [productId]);

  // Handler for when a new style is selected
  const handleStyleSelect = (style: any) => {
    setSelectedStyle(style);  // Update selected style
    setMainImage(style.productImage);  // Update the main image to the style's image
  };

  // If no product is found, display a "Product not found" message
  if (!product) return <div>Product not found</div>;

  return (
    <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <NavigationBar />
      <div className="product-details max-w-5xl mx-auto p-6">
        {/* Product Name */}
        <h1 className="text-2xl font-bold mb-4">{product.itemName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Gallery */}
          <div>
            <Gallery mainImage={mainImage} additionalImages={product.additionalImages || []} />
          </div>

          {/* Right column - Product Details & Style Switcher */}
          <div>
            {/* Style Switcher */}
            {product.styles && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Select Style:</h3>
                <StyleSwitcher
                  styles={Object.values(product.styles)}
                  selectedStyle={selectedStyle}
                  onSelectStyle={handleStyleSelect}
                />
              </div>
            )}

            {/* Product Price */}
            <p className="text-lg font-semibold mb-4">Price: ${product.price.toFixed(2)}</p>

            {/* Product Descriptions */}
            <p className="mb-4">{product.productDescription}</p>
            {product.productDescription2 && <p className="mb-4">{product.productDescription2}</p>}

            {/* Product Dimensions (if available) */}
            {product.dimensions && <p className="text-sm text-gray-600 dark:text-gray-400">Dimensions: {product.dimensions}</p>}

            {/* Availability */}
            <span>
              Availability:
              <button className={`px-3 py-2 text-white mx-2 my-1 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </button>
            </span>

            {/* Add to Cart Button */}
            <div>
              <button className="bg-blue-500 px-3 py-2 text-white rounded-md mt-2">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
