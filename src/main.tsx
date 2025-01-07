import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import Home from "./pages/Home.tsx";
import "./index.css";
import Makeup from "./pages/Makeup.tsx";
import Clothing from "./pages/Clothing.tsx";
import MedicalSupplies from "./pages/MedicalSupplies.tsx";
import HouseholdItems from "./pages/HouseholdItems.tsx";
import Tech from "./pages/Tech.tsx";
import Login from "./pages/Login.tsx";
import Cart from "./pages/Cart.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import Logout from "./components/Logout.tsx";
import { ThemeProvider } from "./context/theme/ThemeContext.tsx";
import Error from "./components/Error.tsx";
import Dashboard from "./pages/userDashboard/Dashboard.tsx";
import AddProduct from "./pages/userDashboard/AddProduct.tsx";
import Contact from "./pages/Contact.tsx";
import Orders from "./pages/userDashboard/Orders.tsx";
import Confirmation from "./pages/Confirmation.tsx";
import CheckoutPage from "./pages/Checkout.tsx";
import Cancel from "./pages/Cancel.tsx";
import { UserProvider } from "./context/user-context.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/userDashboard/Profile.tsx";
import EditProfile from "./pages/userDashboard/EditProfile.tsx";
import OrderDetails from "./pages/userDashboard/OrderDetails.tsx";
import PaymentDetails from "./pages/PaymentDetails.tsx";
import CartProvider from "./context/cart-context.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/product/:productId/style/:styleId", // Dynamic route
    element: <ProductDetails />, // No props here
    errorElement: <Error />,
  },
  {
    path: "householdItems",
    element: <HouseholdItems />,
    errorElement: <Error />,
  },
  {
    path: "makeup",
    element: <Makeup />,
    errorElement: <Error />,
  },
  {
    path: "clothing",
    element: <Clothing />,
    errorElement: <Error />,
  },
  {
    path: "medicalsupplies",
    element: <MedicalSupplies />,
    errorElement: <Error />,
  },
  {
    path: "tech",
    element: <Tech />,
    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "cart",
    element: <Cart />,
    errorElement: <Error />,
  },
  {
    path: "logout",
    element: <Logout />,
    errorElement: <Error />,
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
    errorElement: <Error />,
  },
  {
    path: "/addProduct",
    element: <AddProduct />,
    errorElement: <Error />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <Error />,
  },
  {
    path: "/orders",
    element: <Orders />,
    errorElement: <Error />,
  },
  {
    path: "/success",
    element: <Confirmation />,
    errorElement: <Error />,
  },
  {
    path: "/checkout",
    element: (
      <Elements stripe={loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`)}>
        <CheckoutPage />
      </Elements>
    ),
    errorElement: <Error />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
    errorElement: <Error />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "*", // Wildcard route to catch all undefined paths at the end
    element: <NotFound />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/order/:orderId",
    element: <OrderDetails />,
  },
  {
    path: "/payment",
    element: <PaymentDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
 
   <CartProvider>
     <UserProvider>
     

    
     <ThemeProvider>
         <RouterProvider router={router} />
      
     </ThemeProvider>
    
   </UserProvider>
   </CartProvider>
  
  
);
