import React, { useEffect, useState } from "react";
import { fetchOrders, updateOrder, deleteOrder } from "./api/apiClient";
import CreateOrderForm from "../CreateOrderForm";
import { toast } from "react-toastify";

function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    customer_name: "",
    product_name: "",
    quantity: 1,
    status: "Pending",
  });

  // ✅ Login and store token
  const loginAndStoreToken = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "password" }),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("❌ Login failed");
    }
  };

  // ✅ Load orders
  const loadOrders = async () => {
    try {
      const data = await fetchOrders(); // assumes token is used inside fetchOrders
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders:", err);
      toast.error("❌ Failed to load orders");
    }
  };

  // ✅ useEffect to handle login + load
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        await loginAndStoreToken();
      }
      await loadOrders();
    };
    init();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      toast.success("🗑️ Order deleted");
      await loadOrders();
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("❌ Failed to delete order");
    }
  };

  const startEdit = (order) => {
    setEditingId(order.id);
    setEditForm({
      customer_name: order.customer_name,
      product_name: order.product_name,
      quantity: order.quantity,
      status: order.status,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateOrder(editingId, editForm);
      toast.success("✏️ Order updated");
      setEditingId(null);
      await loadOrders();
    } catch (err) {
      console.error("Update failed", err);
      toast.error("❌ Failed to update order");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>📦 Order Tracking Dashboard</h2>

      <CreateOrderForm onOrderCreated={loadOrders} />

      <h3 style={{ marginTop: "2rem" }}>📋 Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "6px",
                marginBottom: "1rem",
              }}
            >
              <strong>{order.customer_name}</strong> ordered{" "}
              <strong>{order.quantity}</strong> × {order.product_name}
              <br />
              <span>Status: {order.status}</span>
              <br />
              <button onClick={() => startEdit(order)} style={{ marginRight: "0.5rem" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(order.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {editingId && (
        <div style={{ marginTop: "2rem", borderTop: "1px solid #ddd", paddingTop: "1rem" }}>
          <h4>Edit Order</h4>
          <input
            value={editForm.customer_name}
            onChange={(e) => setEditForm({ ...editForm, customer_name: e.target.value })}
            placeholder="Customer Name"
          />
          <input
            value={editForm.product_name}
            onChange={(e) => setEditForm({ ...editForm, product_name: e.target.value })}
            placeholder="Product Name"
          />
          <input
            type="number"
            min="1"
            value={editForm.quantity}
            onChange={(e) => setEditForm({ ...editForm, quantity: parseInt(e.target.value) })}
            placeholder="Quantity"
          />
          <select
            value={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <br />
          <button onClick={handleUpdate} style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}>
            Save
          </button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default OrderDashboard;
