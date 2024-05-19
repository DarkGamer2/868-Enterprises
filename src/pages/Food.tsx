import Footer from "../components/Footer"
import NavigationBar from "../components/Navbar"
import Product from "../components/Product"
import { products } from "../Data/products"

const Food = () => {
  return (
    <div>
      <NavigationBar/>
      <section>
        <h1 className="text-center">Food Items</h1>
        <div className="grid grid-cols-3">
        {products.map((product) => {
          if (product.category === "food") {
            return (
              <Product
                key={product.id}
                productName={product.itemName}
                productImage={product.itemImage}
                productPrice={product.price}
              />
            );
          } else {
            return null;
          }
        })}
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Food
