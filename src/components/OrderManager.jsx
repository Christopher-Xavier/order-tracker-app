import React, { useEffect, useState } from "react";
import { fetchOrders, createOrder, updateOrder, deleteOrder } from "./api"; // adjust path as needed

export default function OrderManager() {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({ customerName: "", product: "", quantity: 1, status: "pending" });

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        try {
            const data = await fetchOrders();
            setOrders(data);
        } catch (err) {
            console.error("Error loading orders:", err.message);
        }
    }

    async function handleCreate() {
        try {
            const created = await createOrder(newOrder);
            setOrders([...orders, created]);
            setNewOrder({ customerName: "", product: "", quantity: 1, status: "pending" });
        } catch (err) {
            console.error("Create failed:", err.message);
        }
    }

    async function handleUpdate(id) {
        try {
            const updated = await updateOrder(id, { ...newOrder, status: "shipped" });
            setOrders(orders.map(o => (o.id === id ? updated : o)));
        } catch (err) {
            console.error("Update failed:", err.message);
        }
    }

    async function handleDelete(id) {
        try {
            await deleteOrder(id);
            setOrders(orders.filter(o => o.id !== id));
        } catch (err) {
            console.error("Delete failed:", err.message);
        }
    }

    return (
        <div>
            <h2>Order Manager</h2>
            <input
                placeholder="Customer Name"
                value={newOrder.customerName}
                onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })}
            />
            <input
                placeholder="Product"
                value={newOrder.product}
                onChange={e => setNewOrder({ ...newOrder, product: e.target.value })}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={newOrder.quantity}
                onChange={e => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
            />
            <button onClick={handleCreate}>Create Order</button>

            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        {order.customerName} - {order.product} ({order.quantity}) [{order.status}]
                        <button onClick={() => handleUpdate(order.id)}>Ship</button>
                        <button onClick={() => handleDelete(order.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
