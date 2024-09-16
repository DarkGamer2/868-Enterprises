import ContactForm from "../components/ContactForm"
import Footer from "../components/Footer"
import NavigationBar from "../components/NavigationBar"
import { useTheme } from "../context/theme/ThemeContext"
const Contact = () => {
    const { theme } = useTheme();
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
        <NavigationBar/>
        <ContactForm/>
        <Footer/>
    </div>
  )
}

export default Contact