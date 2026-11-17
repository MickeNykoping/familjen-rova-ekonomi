function BudgetForm({
  editingBudget,
  budgetAmount,
  setBudgetAmount,
  saveBudget,
  cancelBudgetEdit,
}) {
  if (!editingBudget) {
    return null;
  }

  return (
    <div
      className="card"
      style={{ marginTop: "20px" }}
    >
      <h2>Redigera budget</h2>

      <p>
        {editingBudget.categoryName}
      </p>

      <input
        value={budgetAmount}
        onChange={(e) =>
          setBudgetAmount(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={saveBudget}
      >
        Uppdatera budget
      </button>

      <br />
      <br />

      <button
        onClick={
          cancelBudgetEdit
        }
      >
        Avbryt
      </button>
    </div>
  );
}

export default BudgetForm;