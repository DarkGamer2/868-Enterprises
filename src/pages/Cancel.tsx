import Footer from "../components/Footer"
import NavigationBar from "../components/NavigationBar"

const Cancel = () => {
  return (
    <div>
        <NavigationBar/>
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center">Order Cancelled</h1>
            <p className="text-center">Your order has been cancelled. Please contact us for more information.</p>
            </div>
        <Footer/>
    </div>
  )
}

export default Cancel