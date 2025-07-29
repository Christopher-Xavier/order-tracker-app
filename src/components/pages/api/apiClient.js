import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function fetchWithHandling(url, options = {}, successMsg = null) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Unknown error");
    }

    const data = await response.json();
    if (successMsg) toast.success(successMsg);
    return data;
  } catch (err) {
    console.error("API Error:", err);
    toast.error(`❌ ${err.message}`);
    throw err;
  }
}

export function fetchOrders() {
  return fetchWithHandling(`${API_BASE}/orders`);
}

export function createOrder(orderData) {
  return fetchWithHandling(`${API_BASE}/orders`, {
    method: "POST",
    body: JSON.stringify(orderData),
  }, "✅ Order created!");
}

export function updateOrder(id, order) {
  return fetchWithHandling(`${API_BASE}/orders/${id}`, {
    method: "PUT",
    body: JSON.stringify(order),
  }, "✏️ Order updated!");
}

export function deleteOrder(id) {
  return fetchWithHandling(`${API_BASE}/orders/${id}`, {
    method: "DELETE",
  }, "🗑️ Order deleted");
}
