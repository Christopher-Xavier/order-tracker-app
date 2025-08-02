import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import CreateOrderForm from './components/CreateOrderForm';
import OrderList from './components/OrderList';
import ErrorBoundary from './components/ErrorBoundary';
import OrderForm from './components/OrderForm';
import Spinner from './components/Spinner';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <main className="container mt-4">
      <h1 className="mb-4">📦 Order Tracker</h1>

      {loading && <Spinner />}

      {!token ? (
        <LoginForm onLogin={setToken} setLoading={setLoading} />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Header />
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <ErrorBoundary>
            <CreateOrderForm setLoading={setLoading} />
          </ErrorBoundary>

          <ErrorBoundary>
            <OrderForm setLoading={setLoading} />
          </ErrorBoundary>

          <ErrorBoundary>
            <OrderList setLoading={setLoading} />
          </ErrorBoundary>
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}

export default App;
