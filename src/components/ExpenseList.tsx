

import { useState, type FormEvent } from 'react';
import { type Expense } from '../types/Expense';

const CATEGORIES = ["Alimentação", "Transporte", "Casa", "Lazer", "Outros"];

// Props da lista
interface ExpenseListProps {
  expenses: Expense[];
  onUpdateExpense: (id: number, updatedFields: Partial<Expense>) => Promise<void>;
  onDeleteExpense: (id: number) => Promise<void>;
}

// Exportação nomeada
export function ExpenseList({ expenses, onUpdateExpense, onDeleteExpense }: ExpenseListProps) {

  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);

  const [currentDescription, setCurrentDescription] = useState('');
  const [currentValue, setCurrentValue] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');

  const handleStartEdit = (expense: Expense) => {
    setEditingExpenseId(expense.id);
    setCurrentDescription(expense.description);
    setCurrentValue(expense.value);
    setCurrentCategory(expense.category);
  };

  const handleCancelEdit = () => setEditingExpenseId(null);

  const handleSaveEdit = (e: FormEvent) => {
    e.preventDefault();

    if (!currentDescription.trim() || currentValue <= 0) {
      alert("Preencha a descrição e um valor maior que 0.");
      return;
    }

    if (editingExpenseId === null) return;

    onUpdateExpense(editingExpenseId, {
      description: currentDescription,
      value: currentValue,
      category: currentCategory
    });

    setEditingExpenseId(null);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto mt-6 px-2">

      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="
            bg-white p-5 rounded-2xl shadow
            border border-gray-200
            transition-all duration-300
            hover:shadow-xl hover:scale-[1.01]
          "
        >

          {/* MODO DE EDIÇÃO */}
          {editingExpenseId === expense.id ? (
            <form
              onSubmit={handleSaveEdit}
              className="space-y-4 bg-orange-50 border border-orange-300 rounded-xl p-5"
            >
              <input
                type="text"
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
                required
              />

              <input
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(parseFloat(e.target.value))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
                required
                min="0.01"
                step="0.01"
              />

              <select
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500"
                required
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-sm"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold shadow-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            /* MODO VISUALIZAÇÃO */
            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {expense.description}
                  <span className="text-sm text-gray-500 ml-2">
                    ({expense.category})
                  </span>
                </h3>

                <p className="text-2xl font-bold text-red-600 mt-1">
                  - R$ {expense.value.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleStartEdit(expense)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm"
                >
                  Editar
                </button>

                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm"
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
