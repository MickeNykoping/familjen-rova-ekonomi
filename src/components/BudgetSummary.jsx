function BudgetSummary({
  categories,
  budgets,
  transactions,
}) {
  return (
    <div
      className="card"
      style={{ marginTop: "20px" }}
    >
      <h2>Budgetöversikt</h2>

      {categories.map((category) => {
        const budgetAmount =
          budgets
            .filter(
              (b) =>
                b.category_id ===
                category.id
            )
            .reduce(
              (sum, b) =>
                sum +
                Number(b.amount),
              0
            );

        const expenseAmount =
          transactions
            .filter(
              (t) =>
                t.category_id ===
                category.id
            )
            .reduce(
              (sum, t) =>
                sum +
                Number(t.amount),
              0
            );

        const remaining =
          budgetAmount -
          expenseAmount;

        return (
          <div
            key={category.id}
            style={{
              padding: "10px 0",
              borderBottom:
                "1px solid #ddd",
            }}
          >
            <strong>
              {category.name}
            </strong>

            <br />

            Budget:{" "}
            {budgetAmount.toLocaleString(
              "sv-SE"
            )}{" "}
            kr

            <br />

            Utfall:{" "}
            {expenseAmount.toLocaleString(
              "sv-SE"
            )}{" "}
            kr

            <br />

            Kvar:{" "}
            {remaining.toLocaleString(
              "sv-SE"
            )}{" "}
            kr
          </div>
        );
      })}
    </div>
  );
}

export default BudgetSummary;