import NavigationBar from "../../components/NavigationBar";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useState,useEffect } from "react";
import Order from "../../components/Order";

interface Order {
  accountName: string;
  products: Array<string>;
  date: string;
  id: string;
}
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const API_URL = "http://localhost:4900";
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
    <div>
      <NavigationBar />
      <Sidebar />
      <section>
        <p className="text-center">Your Orders</p>
        return (
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
        );
      </section>
    </div>
  );
};

export default Orders;
