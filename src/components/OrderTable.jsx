import React from 'react';
import './OrderTable.css';

const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return { backgroundColor: '#fff3cd', color: '#856404' };
    case 'completed':
      return { backgroundColor: '#d4edda', color: '#155724' };
    case 'cancelled':
      return { backgroundColor: '#f8d7da', color: '#721c24' };
    default:
      return {};
  }
};

const OrderTable = ({ orders }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Status</th>
          <th>Customer</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td style={getStatusStyle(order.status)}>{order.status}</td>
            <td>{order.customer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
