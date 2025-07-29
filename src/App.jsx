import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import CreateOrderForm from './components/CreateOrderForm';
import OrderList from './components/OrderList';
import ErrorBoundary from "./components/ErrorBoundary";
import OrderForm from './components/OrderForm';
import Spinner from './components/Spinner';

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    error,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  useEffect(() => {
    const storeToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          localStorage.setItem('token', token);
          toast.success("🔐 Authenticated successfully!");
        } catch (err) {
          console.error("❌ Failed to get token:", err);
          toast.error("Failed to retrieve token.");
        }
      }
    };
    storeToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <Spinner />;
  if (error) return <p>⚠️ Auth error: {error.message}</p>;
  if (!isAuthenticated) {
    return (
      <main style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>🔐 Please log in to access the Order Tracker</h2>
        <button onClick={loginWithRedirect}>Log In</button>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <h1>📦 Order Tracker-BI</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>

      <Header />
      <ErrorBoundary>
        <CreateOrderForm />
        <OrderForm />
        <OrderList />
      </ErrorBoundary>

      {/* ✅ Toast container here ensures it's always active */}
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}

export default App;
