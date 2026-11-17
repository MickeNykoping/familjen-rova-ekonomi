function DashboardCards({
  budget,
  expense,
  remaining,
}) {
  return (
    <div className="cards">
      <div className="card">
        <h2>Budget</h2>
        <h3>{budget.toLocaleString("sv-SE")} kr</h3>
      </div>

      <div className="card">
        <h2>Utfall</h2>
        <h3>{expense.toLocaleString("sv-SE")} kr</h3>
      </div>

      <div className="card">
        <h2>Kvar</h2>
        <h3>{remaining.toLocaleString("sv-SE")} kr</h3>
      </div>
    </div>
  );
}

export default DashboardCards;
