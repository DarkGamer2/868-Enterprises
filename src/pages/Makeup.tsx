import NavigationBar from '../components/Navbar'
import Footer from '../components/Footer'
import { products } from '../Data/products'
import Product from '../components/Product'
const Makeup = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavigationBar/>
      <main className='flex-grow'>
      <div className='text-center'>Makeup</div>
      <section className='grid grid-cols-3 gap-4'>
        {products.map((product)=>{
          if (product.category==="makeup"){
            return (
              <Product productName={product.itemName} productImage={product.itemImage} productPrice={product.price.toString()} productID={product.id}/>
            )
          }
        })}
      </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Makeup