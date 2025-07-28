// Base URL from environment variable
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper to get headers with JWT
function getAuthHeaders() {
  const token = localStorage.getItem('token'); // or sessionStorage
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

// Fetch all orders
export async function fetchOrders() {
  const response = await fetch(`${API_BASE}/orders`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
}

// Create a new order
export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error("Failed to create order");
  return response.json();
}

// Update an existing order
export async function updateOrder(id, order) {
  const response = await fetch(`${API_BASE}/orders/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error("Failed to update order");
  return response.json();
}

// Delete an order
export async function deleteOrder(id) {
  const response = await fetch(`${API_BASE}/orders/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error("Failed to delete order");
  return response.json();
}

 
