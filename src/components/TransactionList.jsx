function TransactionList({
  transactions,
  editTransaction,
  deleteTransaction,
}) {
  return (
    <div
      className="card"
      style={{ marginTop: "20px" }}
    >
      <h2>Senaste transaktioner</h2>

      {transactions.map((t) => (
        <div
          key={t.id}
          style={{
            padding: "10px 0",
            borderBottom: "1px solid #ddd",
          }}
        >
          <strong>{t.description}</strong>

          <br />

          {Number(t.amount).toLocaleString(
            "sv-SE"
          )}{" "}
          kr

          <br />

          {t.transaction_date}

          <br />
          <br />

          <button
            onClick={() => editTransaction(t)}
          >
            Redigera
          </button>

          {" "}

          <button
            onClick={() =>
              deleteTransaction(t.id)
            }
          >
            Ta bort
          </button>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
