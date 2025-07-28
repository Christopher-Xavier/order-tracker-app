import React from 'react';
import Header from './components/Header';
import CreateOrderForm from './components/CreateOrderForm';
import OrderList from './components/OrderList';
import ErrorBoundary from "./components/ErrorBoundary";
import OrderForm from './components/OrderForm';

function App() {
  return (
    <main style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <h1>📦 Order Tracker-BI</h1>
	   <Header/>
	   <OrderList/>
	   <CreateOrderForm/>
	   <ErrorBoundary/>
      <OrderForm />
      <OrderList />
    </main>
  );
}

export default App;
