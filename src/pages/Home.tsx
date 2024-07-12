import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProductList from "../components/ProductList"
import Slider from "../components/Slider"

const Home = () => {
  return (
  
     <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-grow">
        <Slider/>
        <ProductList/>
        </main>
        <Footer/>
    </div>

  )
}

export default Home