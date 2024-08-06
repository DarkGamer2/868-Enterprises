import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.tsx';
import './index.css'
import Makeup from './pages/Makeup.tsx';
import Clothing from './pages/Clothing.tsx';
import MedicalSupplies from './pages/MedicalSupplies.tsx';
import HouseholdItems from './pages/HouseholdItems.tsx';
import Tech from './pages/Tech.tsx';
import Login from './pages/Login.tsx';
import CartContextProvider from './context/cart-context.tsx';
import Cart from './pages/Cart.tsx';
import ProductDetails from './pages/ProductDetails.tsx';
import { products } from './Data/products.ts';
import CreateAccount from './pages/CreateAccount.tsx';
import Logout from './components/Logout.tsx';
import { ThemeProvider } from './context/theme/ThemeContext.tsx';

interface ProductProps{
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  inStock: boolean;
}

const product:ProductProps = products.map((product) => {
  return {
    productName: product.itemName,
    productPrice: product.price,
    productDescription: product.category,
    productImage:product.itemImage,
    inStock:product.inStock
  };
})[0]; // Assuming there's at least one product in the array

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:"householdItems",
    element:<HouseholdItems/>
  },
  {
    path:"makeup",
    element:<Makeup/>
  },
  {
    path:"clothing",
    element:<Clothing/>
  },
  {
    path:"medicalsupplies",
    element:<MedicalSupplies/>
  },
  {
    path:"tech",
    element:<Tech/>
  },
  {
    path:"login",
    element:<Login/>
  },
  {
    path:"cart",
    element:<Cart/>
  },
  {
    path:":id",
    element:<ProductDetails productName={product.productName} productPrice={product.productPrice} productDescription={product.productDescription} productImage={product.productImage} inStock={product.inStock}/>
  },
  {
    path:"logout",
    element:<Logout/>
  },
{
  path:"/createAccount",
  element:<CreateAccount/>
}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <ThemeProvider>
   <CartContextProvider>
      <RouterProvider router={router}/>
    </CartContextProvider>
   </ThemeProvider>
  </React.StrictMode>,
)