import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function SkulderLan() {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    loadDebts();
  }, []);

  async function loadDebts() {
    const { data } = await supabase
      .from("monthly_expenses")
      .select("*")
      .eq("expense_group", "Skulder");

    if (data) {
      const sortedDebts = [...data].sort(
        (a, b) =>
          Number(b.amount) -
          Number(a.amount)
      );

      setDebts(sortedDebts);
    }
  }

  const totalDebt = debts.reduce(
    (sum, debt) =>
      sum + Number(debt.amount),
    0
  );

  return (
    <div
      className="card"
      style={{
        marginTop: "20px",
      }}
    >
      <h2>Skulder & Lån</h2>

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
                padding: "8px",
              }}
            >
              Skuld
            </th>

            <th
              style={{
                textAlign: "right",
                padding: "8px",
              }}
            >
              Saldo
            </th>
          </tr>
        </thead>

        <tbody>
          {debts.map((debt) => (
            <tr key={debt.id}>
              <td
                style={{
                  padding: "8px",
                  borderBottom:
                    "1px solid #ddd",
                }}
              >
                {debt.expense_name}
              </td>

              <td
                style={{
                  padding: "8px",
                  textAlign: "right",
                  borderBottom:
                    "1px solid #ddd",
                }}
              >
                {Number(
                  debt.amount
                ).toLocaleString(
                  "sv-SE"
                )}{" "}
                kr
              </td>
            </tr>
          ))}

          <tr>
            <td
              style={{
                fontWeight: "bold",
                paddingTop: "15px",
                borderTop:
                  "2px solid #ddd",
              }}
            >
              Skulder totalt
            </td>

            <td
              style={{
                textAlign: "right",
                fontWeight: "bold",
                paddingTop: "15px",
                borderTop:
                  "2px solid #ddd",
              }}
            >
              {totalDebt.toLocaleString(
                "sv-SE"
              )}{" "}
              kr
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SkulderLan;