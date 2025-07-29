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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newOrder = await createOrder(form);
      toast.success("✅ Order created successfully!");
      onOrderCreated?.(newOrder);
      setForm({ customerName: "", product: "", quantity: 1, status: "pending" });
    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("❌ Failed to create order: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Customer Name"
        value={form.customerName}
        onChange={(e) => setForm({ ...form, customerName: e.target.value })}
      />
      <input
        placeholder="Product"
        value={form.product}
        onChange={(e) => setForm({ ...form, product: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
      />
      <button type="submit">Create Order</button>
    </form>
  );
}
