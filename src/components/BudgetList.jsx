function BudgetList({
  budgets,
  editBudget,
}) {
  return (
    <div
      className="card"
      style={{ marginTop: "20px" }}
    >
      <h2>Budgetposter</h2>

      {budgets.length === 0 && (
        <p>Inga budgetposter</p>
      )}

      {budgets.map((budget) => (
        <div
          key={budget.id}
          style={{
            padding: "10px 0",
            borderBottom: "1px solid #ddd",
          }}
        >
          <strong>
            {budget.categoryName}
          </strong>

          <br />

          {Number(
            budget.amount
          ).toLocaleString("sv-SE")} kr

          <br />
          <br />

          <button
            onClick={() =>
              editBudget(budget)
            }
          >
            Redigera
          </button>
        </div>
      ))}
    </div>
  );
}

export default BudgetList;