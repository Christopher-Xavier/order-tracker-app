import React, { useState } from "react";
import { createOrder } from "./pages/api/apiClient";
import { toast } from "react-toastify";

export default function CreateOrderForm({ onOrderCreated }) {
  const [form, setForm] = useState({
    customerName: "",
    product: "",
    quantity: 1,
    status: "pending",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    // Basic validation
    if (!form.customerName || !form.product || form.quantity < 1) {
      toast.warn("⚠️ Please fill out all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const newOrder = await createOrder(form);
      toast.success("✅ Order created successfully!");
      onOrderCreated?.(newOrder);
      setForm({ customerName: "", product: "", quantity: 1, status: "pending" });
    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("❌ Failed to create order: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem", maxWidth: "400px" }}>
      <label>
        Customer Name
        <input
          required
          placeholder="Customer Name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        />
      </label>

      <label>
        Product
        <input
          required
          placeholder="Product"
          value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })}
        />
      </label>

      <label>
        Quantity
        <input
          required
          type="number"
          min="1"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
        />
      </label>

      <label>
        Status
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Order"}
      </button>
    </form>
  );
}
