import React from "react";
import CreateOrderForm from "./CreateOrderForm"; // adjust path if needed

export default function OrderPage() {
  const handleOrderCreated = (newOrder) => {
    console.log("Order created:", newOrder);
    // You can add logic here to update a list or show a success message
  };

  return <CreateOrderForm onOrderCreated={handleOrderCreated} />;
}
