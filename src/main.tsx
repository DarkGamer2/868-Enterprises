import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import "./index.css";
import Makeup from "./pages/Makeup.tsx";
import Clothing from "./pages/Clothing.tsx";
import MedicalSupplies from "./pages/MedicalSupplies.tsx";
import HouseholdItems from "./pages/HouseholdItems.tsx";
import Tech from "./pages/Tech.tsx";
import Login from "./pages/Login.tsx";
import CartContextProvider from "./context/cart-context.tsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    element: <CheckoutPage />,
    errorElement: <Error />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
    errorElement: <Error />,
  },
  {
    path: "*", // Wildcard route to catch all undefined paths
    element: <NotFound />,
    errorElement: <Error />,
  },
  {
    path: "/product/:productId", // Change the dynamic route to be more specific
    element: <ProductDetails />,
    errorElement: <Error />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  // {
  //   path:"dev/addproduct",
  //   element: <AddProductTest />,
  // }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <ThemeProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </ThemeProvider>
  </UserProvider>
);