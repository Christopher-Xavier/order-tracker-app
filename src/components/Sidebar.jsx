export default function Sidebar() {
  return (
    <aside style={{ width: "240px", background: "#222", color: "white", padding: "20px" }}>
      <nav>
        <h2>📦 Dashboard</h2>
        <ul>
          <li>Orders</li>
          <li>Inventory</li>
          <li>Reports</li>
        </ul>
      </nav>
    </aside>
  );
}
