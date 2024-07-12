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
 },{
  path:"cart",
  element:<Cart/>
 }
  


  
 
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <CartContextProvider>
  <RouterProvider router={router}/>
  </CartContextProvider>
  </React.StrictMode>,
)
