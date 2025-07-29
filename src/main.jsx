import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-44fste4ns2b32xs2.us.auth0.com"
      clientId="YQWIwYk3mFt0f8wDoAGxUoD06Wygc2OZ"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://order-tracker/api", // 👈 match your Auth0 API identifier
        scope: "openid profile email"
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);

