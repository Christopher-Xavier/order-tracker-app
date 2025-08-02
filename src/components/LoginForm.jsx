import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success("✅ Logged in!");
        onLogin?.(data.token);
      } else {
        toast.error("❌ " + data.error);
      }
    } catch (err) {
      toast.error("❌ Login failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: "grid", gap: "0.5rem", maxWidth: "300px" }}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
