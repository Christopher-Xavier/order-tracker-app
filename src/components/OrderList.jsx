
import { useEffect, useState } from "react";
import { fetchOrders } from "./api/apiClient";
import { useAuth0 } from "@auth0/auth0-react";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    async function loadOrders() {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://order-tracker-api", // Set this in Auth0 API settings
            scope: "read:orders",
          },
        });

        const data = await fetchOrders(token); // Pass token to API client

        console.log("Type of data:", typeof data);
        console.log("Is array:", Array.isArray(data));
        console.log("Data content:", data);

        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
          ? data.orders
          : [];

        setOrders(normalized);
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders([]);
      }
    }

    loadOrders();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={order.id ?? index}>
            {order.customer_name ?? "Unknown"} - {order.status ?? "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
