export default function SummaryCard({ title, count }) {
  return (
    <div style={{
      background: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 1px 3px #ccc"
    }}>
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
}
