import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function LoginForm({ onLogin, setLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post('http://localhost:3000/api/login', {
      email,
      password,
    });

    const token = res.data.token;
    if (token) {
      onLogin(token);
      toast.success('✅ Login successful!');
    } else {
      toast.error('❌ Invalid credentials');
    }
  } catch (err) {
    console.error("Login error:", err); // ✅ Now defined
    toast.error('❌ Login failed');
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
