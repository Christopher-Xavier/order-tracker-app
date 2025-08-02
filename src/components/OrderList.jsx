history
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
 
function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await fetch('http://localhost:3001/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error('❌ Could not load orders');
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to delete order');
      toast.success('✅ Order deleted');
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (err) {
      console.error(err);
      toast.error('❌ Could not delete order');
    }
  };

  return (
    <div>
      <h4>📋 Orders</h4>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order.id} className="list-group-item">
              <strong>{order.customerName}</strong> — {order.status}
              <br />
              Items: {Array.isArray(order.items) ? order.items.join(', ') : 'No items listed'}
              <br />
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => handleDelete(order.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderList;
