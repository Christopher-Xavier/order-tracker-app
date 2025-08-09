history
const API_BASE = "http://localhost:3001/api/orders";

// Helper to get JWT token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Fetch all orders
export async function fetchOrders() {
  const res = await fetch(`${API_BASE}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

// Create a new order
export async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(), // ✅ FIXED: use helper to inject token
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
}

// Update an existing order
export async function updateOrder(id, orderData) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}

// Delete an order
export async function deleteOrder(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete order");
}
