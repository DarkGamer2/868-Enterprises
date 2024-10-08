import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from '../components/Gallery';  
import StyleSwitcher from '../components/StyleSwitcher'; 
import { products } from '../Data/products';  
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useTheme } from '../context/theme/ThemeContext';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();  
  const [product, setProduct] = useState<any>(null);         
  const [selectedStyle, setSelectedStyle] = useState<any>(null);  
  const [mainImage, setMainImage] = useState<string>('');    
  const [additionalImages, setAdditionalImages] = useState<string[]>([]); 
  const { theme } = useTheme();  

  // Fetch the product based on the productId from the URL
  useEffect(() => {
    const selectedProduct = products.find((product) => product.id === parseInt(productId!));

    if (selectedProduct) {
      setProduct(selectedProduct);

      // Set the first available style as the default style, if styles exist
      const initialStyle = selectedProduct.styles ? Object.values(selectedProduct.styles)[0] : null;
      setSelectedStyle(initialStyle);

      // Default the main image and additional images based on initial style
      if (initialStyle) {
        setMainImage(initialStyle.productImage || selectedProduct.itemImage || '');
        setAdditionalImages(initialStyle.additionalImages || selectedProduct.additionalImages || []);
      }
    }
  }, [productId]);

  // Effect to handle updating images when switching styles
  useEffect(() => {
    if (selectedStyle) {
      setMainImage(selectedStyle.productImage || product.itemImage || '');
      setAdditionalImages(selectedStyle.additionalImages || product.additionalImages || []);
    }
  }, [selectedStyle, product]);

  // Handler for when a new style is selected
  const handleStyleSelect = (style: any) => {
    setSelectedStyle(style);
  };

  // If no product is found, display a "Product not found" message
  if (!product) return <div>Product not found</div>;

  // Determine stock status based on selectedStyle or product
  const isInStock = selectedStyle?.inStock ?? product.inStock;

  return (
    <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <NavigationBar />
      <div className="product-details max-w-5xl mx-auto p-6">
        {/* Product Name */}
        <h1 className="text-2xl font-bold mb-4">{selectedStyle ? selectedStyle.styleName : product.itemName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Gallery */}
          <div>
            <Gallery mainImage={mainImage} additionalImages={additionalImages} />
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
            <p className="text-lg font-semibold mb-4">
              Price: ${selectedStyle ? selectedStyle.price.toFixed(2) : product.price.toFixed(2)}
            </p>

            {/* Product Descriptions */}
            <p className="mb-4">{selectedStyle ? selectedStyle.description : product.productDescription}</p>
            {product.productDescription2 && <p className="mb-4">{product.productDescription2}</p>}

            {/* Product Dimensions (if available) */}
            {product.dimensions && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dimensions: {product.dimensions}
              </p>
            )}

            {/* Availability */}
            <span>
              Availability:
              <button className={`px-3 py-2 text-white mx-2 my-1 ${isInStock ? 'bg-green-500' : 'bg-red-500'}`}>
                {isInStock ? 'In Stock' : 'Out of Stock'}
              </button>
            </span>

            {/* Add to Cart Button */}
            <div>
              <button 
                className={`px-3 py-2 text-white rounded-md mt-2 ${isInStock ? 'bg-blue-500' : 'bg-gray-500 cursor-not-allowed'}`} 
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
