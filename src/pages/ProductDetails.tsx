import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../context/theme/ThemeContext";

interface ProductProps {
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  inStock: boolean;
}

const ProductDetails = (props: ProductProps) => {
  return (
   <ThemeProvider>
     <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-grow">
        <h1 className="text-center">Product Details</h1>
        <div className="flex justify-evenly">
          <div>
            <img
              src={props.productImage}
              className="h-60 w-60 rounded-md object-cover"
              alt={props.productName}
            />
          </div>
          <div id="product-details">
            <h1 className="font-lato text-2xl my-2">{props.productName}</h1>
            <p className="font-lato text-lg my-2">{props.productDescription}</p>
            <p className="font-lato my-2">Price: ${props.productPrice}</p>
            <div className="my-2">
              <p>
                Availability:{" "}
                {props.inStock ? (
                  <button className="bg-green-500 px-1 py-1 text-white">
                    In Stock
                  </button>
                ) : (
                  <button className="bg-red-500 px-1 py-1 text-white">
                    Out Of Stock
                  </button>
                )}
              </p>
            </div>
            <p className="my-2">
              Quantity: <input />
            </p>
            <div>
              <button className="mt-2 px-3 py-2 bg-blue-600 rounded-md text-white font-serif my-2">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
   </ThemeProvider>
  );
};

export default ProductDetails;
