import NavigationBar from "../../components/NavigationBar";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useState,useEffect } from "react";
import Order from "../../components/Order";
import { useTheme } from "../../context/theme/ThemeContext";
interface Order {
  accountName: string;
  products: Array<string>;
  date: string;
  id: string;
}
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { theme } = useTheme();
  const API_URL = "https://868-enterprises-api-production.up.railway.app";
  const fetchOrders = async () => {
    await axios
      .get(`${API_URL}/api/users/:username/orders`)
      .then((response) => {
        setOrders(response.data);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  
  return (
    <div className={`${theme==="dark"?"dark":"light"}`}>
    <div className="dark:bg-black bg-white">
    <NavigationBar />
    <div className="flex">
   <div>
   <Sidebar />
   </div>
      <div>
      <section className="">
        <p className="text-center dark:text-white text-black">Your Orders</p>
          <div>
            {orders.map((order: Order) => {
              return (
                <Order
                  key={order.id}
                  accountName={order.accountName}
                  products={order.products}
                  date={order.date}
                />
              );
            })}
          </div>
      </section>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Orders;
