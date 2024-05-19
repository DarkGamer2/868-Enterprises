import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.tsx';
import './index.css'
import Food from './pages/Food.tsx';
import Makeup from './pages/Makeup.tsx';
import Clothing from './pages/Clothing.tsx';
import MedicalSupplies from './pages/MedicalSupplies.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
 {
  path:"food",
  element:<Food/>
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
 }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
