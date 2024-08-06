import Footer from "../components/Footer";
import Navbar from "../components/NavigationBar";
import ProductList from "../components/ProductList";
import Slider from "../components/Slider";
import { useTheme } from "../context/theme/ThemeContext";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />
      <main className={`flex-grow ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <Slider />
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
