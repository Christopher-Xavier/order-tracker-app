import React, { useEffect, useState } from 'react';
import { fetchOrders, updateOrder, deleteOrder } from './api/apiClient';
import CreateOrderForm from './CreateOrderForm';

function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ customer_name: '', product_name: '', status: 'Pending' });

  // ✅ Login and store token
  const loginAndStoreToken = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "password" })
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // ✅ Load orders
  const loadOrders = async () => {
    try {
      const data = await fetchOrders(); // assumes token is used inside fetchOrders
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders:", err);
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
      await loadOrders();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const startEdit = (order) => {
    setEditingId(order.id);
    setEditForm(order);
  };

  const handleUpdate = async () => {
    try {
      await updateOrder(editingId, editForm);
      setEditingId(null);
      await loadOrders();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <div>
      <h2>Order Tracking Dashboard</h2>
      <CreateOrderForm onOrderCreated={loadOrders} />

      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.customer_name} - {order.product_name} ({order.status}){' '}
            <button onClick={() => startEdit(order)}>Edit</button>
            <button onClick={() => handleDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingId && (
        <div>
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
          <select
            value={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
        </div>
      )}
    </div>
  );
}

export default OrderDashboard;
