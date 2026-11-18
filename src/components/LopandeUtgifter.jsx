import React, { useEffect, useState } from "react";
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
        .order("expense_group")
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

  const groups = [
    ...new Set(
      rows.map((r) => r.expense_group)
    ),
  ];

  function rowTotal(name) {
    return monthlyExpenses
      .filter(
        (e) => e.expense_name === name
      )
      .reduce(
        (sum, e) =>
          sum + Number(e.amount),
        0
      );
  }

  function groupTotal(group) {
    const groupRows = rows.filter(
      (r) => r.expense_group === group
    );

    return groupRows.reduce(
      (sum, row) =>
        sum + rowTotal(row.name),
      0
    );
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
                  position: "sticky",
                  left: 0,
                  background: "#ffffff",
                  zIndex: 100,
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
                  background: "#f3f3f3",
                }}
              >
                År
              </th>
            </tr>
          </thead>

          <tbody>
            {groups.map((group) => {
              const groupRows = rows.filter(
                (r) =>
                  r.expense_group === group
              );

              return (
                <React.Fragment
                  key={group}
                >
                  <tr>
                    <td
                      colSpan={14}
                      style={{
                        background:
                          "#e8edf5",
                        fontWeight:
                          "bold",
                        padding:
                          "12px",
                        fontSize:
                          "1.1rem",
                        borderTop:
                          "2px solid #d0d7e2",
                      }}
                    >
                      {group.toUpperCase()}
                    </td>
                  </tr>

                  {groupRows.map(
                    (row) => (
                      <tr key={row.id}>
                        <td
                          style={{
                            padding:
                              "8px",
                            textAlign:
                              "left",
                            borderBottom:
                              "1px solid #ddd",
                            position:
                              "sticky",
                            left: 0,
                            background:
                              "#ffffff",
                            zIndex: 10,
                            minWidth:
                              "250px",
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
                          {rowTotal(
                            row.name
                          ).toLocaleString(
                            "sv-SE"
                          )}
                        </td>
                      </tr>
                    )
                  )}

                  <tr>
                    <td
                      colSpan={13}
                      style={{
                        fontWeight:
                          "bold",
                        textAlign:
                          "right",
                        padding:
                          "10px",
                        background:
                          "#f5f5f5",
                      }}
                    >
                      SUMMA{" "}
                      {group.toUpperCase()}
                    </td>

                    <td
                      style={{
                        fontWeight:
                          "bold",
                        textAlign:
                          "right",
                        background:
                          "#f5f5f5",
                        padding:
                          "10px",
                      }}
                    >
                      {groupTotal(
                        group
                      ).toLocaleString(
                        "sv-SE"
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LopandeUtgifter;