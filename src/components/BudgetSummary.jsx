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

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Kategori
            </th>

            <th>Budget</th>
            <th>Utfall</th>
            <th>Kvar</th>
          </tr>
        </thead>

        <tbody>
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
              <tr key={category.id}>
                <td>
                  {category.name}
                </td>

                <td>
                  {budgetAmount.toLocaleString(
                    "sv-SE"
                  )}
                </td>

                <td>
                  {expenseAmount.toLocaleString(
                    "sv-SE"
                  )}
                </td>

                <td>
                  {remaining.toLocaleString(
                    "sv-SE"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BudgetSummary;