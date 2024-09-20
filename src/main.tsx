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
import { products } from "./Data/products.ts";
import CreateAccount from "./pages/CreateAccount.tsx";
import Logout from "./components/Logout.tsx";
import { ThemeProvider } from "./context/theme/ThemeContext.tsx";
import Error from "./components/Error.tsx";
import Dashboard from "./pages/userDashboard/Dashboard.tsx";
import { AuthProvider } from "./context/auth-context.tsx";
import AddProduct from "./pages/userDashboard/AddProduct.tsx";
import Contact from "./pages/Contact.tsx";
import Orders from "./pages/userDashboard/Orders.tsx";
import Confirmation from "./pages/Confirmation.tsx";
import CheckoutPage from "./pages/Checkout.tsx";
import Cancel from "./pages/Cancel.tsx";
import { UserProvider } from "./context/user-context.tsx";
import NotFound from "./pages/NotFound.tsx"

interface ProductProps {
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  inStock: boolean;
}

const product: ProductProps = products.map((product) => {
  return {
    productName: product.itemName,
    productPrice: product.price,
    productDescription: product.category,
    productImage: product.itemImage,
    inStock: product.inStock ?? false, // Ensure inStock is always a boolean
  };
})[0]; // Assuming there's at least one product in the array

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "householdItems",
    element: <HouseholdItems />,
  },
  {
    path: "makeup",
    element: <Makeup />,
  },
  {
    path: "clothing",
    element: <Clothing />,
  },
  {
    path: "medicalsupplies",
    element: <MedicalSupplies />,
  },
  {
    path: "tech",
    element: <Tech />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: ":id",
    element: (
      <ProductDetails
        productName={product.productName}
        productPrice={product.productPrice}
        productDescription={product.productDescription}
        productImage={product.productImage}
        inStock={product.inStock}
      />
    ),
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/addProduct",
    element: <AddProduct />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/success",
    element: <Confirmation />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },
  {
    path: "*", // Wildcard route to catch all undefined paths
    element: <NotFound />,
  },
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