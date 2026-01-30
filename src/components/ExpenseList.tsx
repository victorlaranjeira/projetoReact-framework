import { useState, type FormEvent } from "react";
import { type Expense } from "../types/Expense";

const CATEGORIES = ["Alimentação", "Transporte", "Casa", "Lazer", "Outros"];

interface ExpenseListProps {
  expenses: Expense[];
  onUpdateExpense: (id: number, updatedFields: Partial<Expense>) => Promise<void>;
  onDeleteExpense: (id: number) => Promise<void>;
}

export function ExpenseList({
  expenses,
  onUpdateExpense,
  onDeleteExpense,
}: ExpenseListProps) {

  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("Outros");

  const handleStartEdit = (expense: Expense) => {
    setEditingExpenseId(expense.id);
    setCurrentDescription(expense.description);
    setCurrentValue(expense.value);
    setCurrentCategory(expense.category);
  };

  const handleCancelEdit = () => {
    setEditingExpenseId(null);
  };

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentDescription.trim() || currentValue <= 0) {
      alert("Preencha a descrição e um valor maior que 0.");
      return;
    }

    if (editingExpenseId === null) return;

    await onUpdateExpense(editingExpenseId, {
      description: currentDescription,
      value: currentValue,
      category: currentCategory,
    });

    setEditingExpenseId(null);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto mt-6 px-2">

      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="bg-white p-5 rounded-2xl shadow border border-gray-200 hover:shadow-xl transition-all"
        >

          {/* ===== MODO EDITAR ===== */}
          {editingExpenseId === expense.id ? (
            <form
              onSubmit={handleSaveEdit}
              className="space-y-4 bg-orange-50 border border-orange-300 rounded-xl p-5"
            >
              <input
                type="text"
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
                className="w-full p-3 rounded-lg border"
              />

              <input
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                className="w-full p-3 rounded-lg border"
                min="0.01"
                step="0.01"
              />

              <select
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
                className="w-full p-3 rounded-lg border bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Salvar
                </button>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            /* ===== MODO VISUALIZAR ===== */
            <div className="flex justify-between items-center">

              <div>
                <h3 className="text-lg font-bold">
                  {expense.description}
                  <span className="text-sm text-gray-500 ml-2">
                    ({expense.category})
                  </span>
                </h3>

                <p className="text-2xl font-bold text-red-600">
                  R$ {expense.value.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStartEdit(expense)}
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                >
                  Editar
                </button>

                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg"
                >
                  Excluir
                </button>
              </div>

            </div>
          )}

        </div>
      ))}
    </div>
  );
}
