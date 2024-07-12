import NavigationBar from "../components/Navbar"
import Footer from "../components/Footer"
const Tech = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar/>
     <main className="flex-grow">
    <div>
      <h1 className="text-center">Tech & Electronics</h1>
    </div>
     </main>
      <Footer/>
    </div>
  )
}

export default Tech