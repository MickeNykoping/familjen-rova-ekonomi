import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function DashboardCards({
  budget,
  expense,
  remaining,
}) {
  const [totalDebt, setTotalDebt] =
    useState(0);

  useEffect(() => {
    loadDebt();
  }, []);

  async function loadDebt() {
    const { data } = await supabase
      .from("monthly_expenses")
      .select("amount")
      .eq("expense_group", "Skulder");

    if (data) {
      const debtSum = data.reduce(
        (sum, row) =>
          sum + Number(row.amount),
        0
      );

      setTotalDebt(debtSum);
    }
  }

  return (
    <div className="cards">
      <div className="card">
        <h2>Budget</h2>

        <h3>
          {budget.toLocaleString(
            "sv-SE"
          )}{" "}
          kr
        </h3>
      </div>

      <div className="card">
        <h2>Utfall</h2>

        <h3>
          {expense.toLocaleString(
            "sv-SE"
          )}{" "}
          kr
        </h3>
      </div>

      <div className="card">
        <h2>Kvar</h2>

        <h3>
          {remaining.toLocaleString(
            "sv-SE"
          )}{" "}
          kr
        </h3>
      </div>

      <div className="card">
        <h2>Skulder</h2>

        <h3>
          {totalDebt.toLocaleString(
            "sv-SE"
          )}{" "}
          kr
        </h3>
      </div>
    </div>
  );
}

export default DashboardCards;