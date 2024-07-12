import NavigationBar from "../components/Navbar"
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

interface productProps{
productName: string;
productPrice: number;
productDescription: string;
}
const ProductDetails = (props:productProps) => {
  return (
  <div>
    <NavigationBar/>
    <div>
        <h1 className="text-center">Product Details</h1>
        <div>
            <img src={"product image"} alt="product image"/>
        </div>
        <div id="product-details">
            <h1>{props.productName}</h1>
            <h3>{props.productPrice}</h3>
            <p>{props.productDescription}</p>
        </div>
    </div>
    <Footer/>
  </div>
   
  )
}

export default ProductDetails