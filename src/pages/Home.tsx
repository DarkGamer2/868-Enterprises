import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProductList from "../components/ProductList"
import Slider from "../components/Slider"

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Slider/>
        <ProductList/>
        <Footer/>
    </div>
  )
}

export default Home