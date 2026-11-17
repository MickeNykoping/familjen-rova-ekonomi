import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function LopandeUtgifter() {
  const [rows, setRows] = useState([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    loadRows();
  }, []);

  async function loadRows() {
    const { data } = await supabase
      .from("expense_rows")
      .select("*")
      .order("expense_group")
      .order("sort_order");

    if (data) {
      setRows(data);
    }
  }

  let currentGroup = "";

  return (
    <div
      className="card"
      style={{ marginTop: "20px" }}
    >
      <h2>Löpande utgifter 2026</h2>

      <div style={{ overflowX: "auto" }}>
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
                  minWidth: "250px",
                }}
              >
                Utgift
              </th>

              {months.map((month) => (
                <th key={month}>
                  {month}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const showGroup =
                row.expense_group !== currentGroup;

              if (showGroup) {
                currentGroup =
                  row.expense_group;
              }

              return (
                <>
                  {showGroup && (
                    <tr
                      key={
                        row.expense_group
                      }
                    >
                      <td
                        colSpan={13}
                        style={{
                          fontWeight:
                            "bold",
                          background:
                            "#f0f0f0",
                          padding:
                            "10px",
                        }}
                      >
                        {
                          row.expense_group
                        }
                      </td>
                    </tr>
                  )}

                  <tr key={row.id}>
                    <td>{row.name}</td>

                    {months.map(
                      (month) => (
                        <td
                          key={month}
                        >
                          0
                        </td>
                      )
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LopandeUtgifter;