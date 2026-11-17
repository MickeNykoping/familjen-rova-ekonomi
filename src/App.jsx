import DashboardCards from "./components/DashboardCards";
import BudgetList from "./components/BudgetList";
import BudgetForm from "./components/BudgetForm";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

import { useAppData } from "./hooks/useAppData";

import "./App.css";

function App() {
  const app = useAppData();

  return (
    <div className="dashboard">
      <h1>{app.householdName}</h1>

      <DashboardCards
        budget={app.budget}
        expense={app.expense}
        remaining={app.remaining}
      />

      <BudgetList
        budgets={app.budgets}
        editBudget={app.editBudget}
      />

      <BudgetForm
        editingBudget={app.editingBudget}
        budgetAmount={app.budgetAmount}
        setBudgetAmount={app.setBudgetAmount}
        saveBudget={app.saveBudget}
        cancelBudgetEdit={app.cancelBudgetEdit}
      />

      <TransactionForm
        editingId={app.editingId}
        description={app.description}
        setDescription={app.setDescription}
        amount={app.amount}
        setAmount={app.setAmount}
        selectedCategory={app.selectedCategory}
        setSelectedCategory={
          app.setSelectedCategory
        }
        categories={app.categories}
        saveTransaction={app.saveTransaction}
        clearForm={app.clearForm}
      />

      <TransactionList
        transactions={app.transactions}
        editTransaction={
          app.editTransaction
        }
        deleteTransaction={
          app.deleteTransaction
        }
      />
    </div>
  );
}

export default App;