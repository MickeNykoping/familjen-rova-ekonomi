import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

function App() {
  const [householdName, setHouseholdName] = useState("");
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [editingId, setEditingId] = useState(null);

  async function loadData() {
    const { data: householdData } = await supabase
      .from("households")
      .select("*")
      .limit(1);

    if (householdData?.length > 0) {
      setHouseholdName(householdData[0].name);
    }

    const { data: categoryData } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (categoryData) {
      setCategories(categoryData);

      if (!selectedCategory && categoryData.length > 0) {
        setSelectedCategory(categoryData[0].id);
      }
    }

    const { data: budgetData } = await supabase
      .from("budgets")
      .select("amount");

    if (budgetData?.length > 0) {
      const totalBudget = budgetData.reduce(
        (sum, row) => sum + Number(row.amount),
        0
      );

      setBudget(totalBudget);
    }

    const { data: transactionData } = await supabase
      .from("transactions")
      .select("*")
      .order("transaction_date", { ascending: false });

    if (transactionData) {
      setTransactions(transactionData);

      const totalExpense = transactionData.reduce(
        (sum, row) => sum + Number(row.amount),
        0
      );

      setExpense(totalExpense);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function saveTransaction() {
    if (!description || !amount || !selectedCategory) {
      return;
    }

    if (editingId) {
      await supabase
        .from("transactions")
        .update({
          description: description,
          amount: Number(amount),
          category_id: selectedCategory,
        })
        .eq("id", editingId);
    } else {
      await supabase.from("transactions").insert([
        {
          household_id:
            "8b8621eb-0f2d-49fc-be1f-8338370a73a7",
          category_id: selectedCategory,
          transaction_date: new Date()
            .toISOString()
            .split("T")[0],
          amount: Number(amount),
          description: description,
        },
      ]);
    }

    clearForm();
    loadData();
  }

  function editTransaction(transaction) {
    setEditingId(transaction.id);
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setSelectedCategory(transaction.category_id);
  }

  function clearForm() {
    setEditingId(null);
    setDescription("");
    setAmount("");
  }

  async function deleteTransaction(id) {
    await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    loadData();
  }

  const remaining = budget - expense;

  return (
    <div className="dashboard">
      <h1>{householdName}</h1>

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

      <div className="card" style={{ marginTop: "20px" }}>
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
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button onClick={saveTransaction}>
          {editingId ? "Uppdatera" : "Spara"}
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

      <div className="card" style={{ marginTop: "20px" }}>
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
              onClick={() =>
                editTransaction(t)
              }
            >
              Redigera
            </button>

            {"  "}

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
    </div>
  );
}

export default App;