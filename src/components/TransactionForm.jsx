function TransactionForm({
  editingId,
  description,
  setDescription,
  amount,
  setAmount,
  selectedCategory,
  setSelectedCategory,
  categories,
  saveTransaction,
  clearForm,
}) {
  return (
    <div
      className="card"
      style={{ marginTop: "20px" }}
    >
      <h2>
        {editingId
          ? "Redigera transaktion"
          : "Ny transaktion"}
      </h2>

      <input
        placeholder="Beskrivning"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br />
      <br />

      <input
        placeholder="Belopp"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }
      >
        {categories.map((c) => (
          <option
            key={c.id}
            value={c.id}
          >
            {c.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={saveTransaction}>
        {editingId
          ? "Uppdatera"
          : "Spara"}
      </button>

      {editingId && (
        <>
          <br />
          <br />

          <button onClick={clearForm}>
            Avbryt
          </button>
        </>
      )}
    </div>
  );
}

export default TransactionForm;