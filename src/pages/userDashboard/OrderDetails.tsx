import NavigationBar from "../../components/NavigationBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const OrderDetails = () => {
    const {orderId}=useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4900/api/orders/${orderId}`, {
        withCredentials: true,
      });
      setOrderDetails(response.data);
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  });
  return (
    <div>
      <NavigationBar />
      <div>
        <h1>Order Details</h1>
      </div>
      <div id="order-details">
        <h1>{orderDetails}</h1>
      </div>
    </div>
  );
};

export default OrderDetails;
