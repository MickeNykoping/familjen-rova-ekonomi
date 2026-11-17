import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAppData() {
  const [householdName, setHouseholdName] = useState("");

  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editingBudget, setEditingBudget] = useState(null);
  const [budgetAmount, setBudgetAmount] = useState("");

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
      .select("*");

    if (budgetData) {
      const budgetsWithNames = budgetData.map(
        (budgetRow) => {
          const category = categoryData?.find(
            (c) => c.id === budgetRow.category_id
          );

          return {
            ...budgetRow,
            categoryName:
              category?.name || "Okänd kategori",
          };
        }
      );

      setBudgets(budgetsWithNames);

      const totalBudget = budgetData.reduce(
        (sum, row) => sum + Number(row.amount),
        0
      );

      setBudget(totalBudget);
    }

    const { data: transactionData } =
      await supabase
        .from("transactions")
        .select("*")
        .order("transaction_date", {
          ascending: false,
        });

    if (transactionData) {
      setTransactions(transactionData);

      const totalExpense =
        transactionData.reduce(
          (sum, row) =>
            sum + Number(row.amount),
          0
        );

      setExpense(totalExpense);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function saveTransaction() {
    if (
      !description ||
      !amount ||
      !selectedCategory
    ) {
      return;
    }

    if (editingId) {
      await supabase
        .from("transactions")
        .update({
          description,
          amount: Number(amount),
          category_id:
            selectedCategory,
        })
        .eq("id", editingId);
    } else {
      await supabase
        .from("transactions")
        .insert([
          {
            household_id:
              "8b8621eb-0f2d-49fc-be1f-8338370a73a7",
            category_id:
              selectedCategory,
            transaction_date:
              new Date()
                .toISOString()
                .split("T")[0],
            amount: Number(amount),
            description,
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
    setSelectedCategory(
      transaction.category_id
    );
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

  function editBudget(budget) {
    setEditingBudget(budget);
    setBudgetAmount(budget.amount);
  }

  function cancelBudgetEdit() {
    setEditingBudget(null);
    setBudgetAmount("");
  }

  async function saveBudget() {
    if (!editingBudget) return;

    await supabase
      .from("budgets")
      .update({
        amount: Number(budgetAmount),
      })
      .eq("id", editingBudget.id);

    cancelBudgetEdit();
    loadData();
  }

  return {
    householdName,

    budget,
    expense,
    remaining: budget - expense,

    transactions,
    budgets,
    categories,

    description,
    amount,
    selectedCategory,

    editingId,
    editingBudget,
    budgetAmount,

    setDescription,
    setAmount,
    setSelectedCategory,
    setBudgetAmount,

    saveTransaction,
    editTransaction,
    deleteTransaction,

    editBudget,
    saveBudget,
    cancelBudgetEdit,

    clearForm,
  };
}