import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function LopandeUtgifter() {
  const [rows, setRows] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] =
    useState([]);

  const months = [
    1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12,
  ];

  const monthNames = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "Maj",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Okt",
    11: "Nov",
    12: "Dec",
  };

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: rowsData } =
      await supabase
        .from("expense_rows")
        .select("*")
        .order("sort_order");

    const { data: expenseData } =
      await supabase
        .from("monthly_expenses")
        .select("*");

    if (rowsData) {
      setRows(rowsData);
    }

    if (expenseData) {
      setMonthlyExpenses(expenseData);
    }
  }

  return (
    <div
      className="card"
      style={{
        marginTop: "20px",
      }}
    >
      <h2>Löpande utgifter 2026</h2>

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            minWidth: "1350px",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  minWidth: "250px",
                }}
              >
                Utgift
              </th>

              {months.map((month) => (
                <th
                  key={month}
                  style={{
                    minWidth: "70px",
                    padding: "10px",
                  }}
                >
                  {monthNames[month]}
                </th>
              ))}

              <th
                style={{
                  minWidth: "100px",
                  padding: "10px",
                  background:
                    "#f3f3f3",
                }}
              >
                År
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const yearlyTotal =
                monthlyExpenses
                  .filter(
                    (e) =>
                      e.expense_name ===
                      row.name
                  )
                  .reduce(
                    (sum, e) =>
                      sum +
                      Number(
                        e.amount
                      ),
                    0
                  );

              return (
                <tr key={row.id}>
                  <td
                    style={{
                      padding:
                        "8px",
                      textAlign:
                        "left",
                      borderBottom:
                        "1px solid #ddd",
                    }}
                  >
                    {row.name}
                  </td>

                  {months.map(
                    (month) => {
                      const expense =
                        monthlyExpenses.find(
                          (e) =>
                            e.expense_name ===
                              row.name &&
                            e.month ===
                              month
                        );

                      return (
                        <td
                          key={
                            month
                          }
                          style={{
                            textAlign:
                              "center",
                            borderBottom:
                              "1px solid #ddd",
                          }}
                        >
                          {expense
                            ? Number(
                                expense.amount
                              ).toLocaleString(
                                "sv-SE"
                              )
                            : "-"}
                        </td>
                      );
                    }
                  )}

                  <td
                    style={{
                      textAlign:
                        "right",
                      fontWeight:
                        "bold",
                      background:
                        "#fafafa",
                      borderBottom:
                        "1px solid #ddd",
                      padding:
                        "8px",
                    }}
                  >
                    {yearlyTotal.toLocaleString(
                      "sv-SE"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LopandeUtgifter;