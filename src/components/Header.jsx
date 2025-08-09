export default function Header() {
  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 24px",
      backgroundColor: "#1c5186ff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      color: "#fff"
    }}>
      <h1 style={{ margin: 0, fontSize: "1.25rem" }}>🚀 Order Nest Dashboard</h1>

      <input
        type="text"
        placeholder="Search..."
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "1rem"
        }}
        aria-label="Search orders"
      />

      <div style={{ fontSize: "1rem" }}>👤 Admin </div>
    </header>
  );
}
