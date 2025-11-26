// src/pages/HomePage/HomePage.tsx

import { useState, useEffect, type FormEvent } from 'react';

import { type Expense } from '../../types/Expense';
import {
  fetchAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} from '../../services/expenseService';

import { ExpenseList } from "../../components/ExpenseList";

export default function HomePage() {

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newDescription, setNewDescription] = useState('');
  const [newValue, setNewValue] = useState(0);
  const [newCategory, setNewCategory] = useState('Alimentação');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchAllExpenses();
        setExpenses(data);
      } catch (err) {
        setError("Erro ao carregar despesas. Verifique o JSON Server.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleAddExpense(e: FormEvent) {
    e.preventDefault();

    if (!newDescription.trim() || newValue <= 0) {
      setError("Preencha a descrição e informe um valor maior que 0.");
      return;
    }

    try {
      setError(null);

      const newData = {
        description: newDescription,
        value: newValue,
        category: newCategory
      };

      const created = await createExpense(newData);

      setExpenses(prev => [...prev, created]);

      setNewDescription('');
      setNewValue(0);

    } catch (err) {
      setError("Falha ao cadastrar a despesa.");
      console.error(err);
    }
  }

  async function handleUpdateExpense(id: number, fields: Partial<Expense>) {
    try {
      setError(null);

      const updated = await updateExpense(id, fields);

      setExpenses(prev =>
        prev.map(item => (item.id === id ? updated : item))
      );

    } catch (err) {
      setError("Falha ao atualizar despesa.");
      console.error(err);
    }
  }

  async function handleDeleteExpense(id: number) {
    if (!window.confirm("Deseja realmente excluir esta despesa?")) return;

    try {
      setError(null);

      await deleteExpense(id);

      setExpenses(prev => prev.filter(item => item.id !== id));

    } catch (err) {
      setError("Erro ao excluir despesa.");
      console.error(err);
    }
  }

  if (loading) {
    return <h1 className="text-center text-gray-700 mt-10">Carregando...</h1>;
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">

      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
         Controle de Despesas
      </h1>

      {/* Cartão do Formulário */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-10 border border-gray-200">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          Adicionar Nova Despesa
        </h2>

        <form onSubmit={handleAddExpense} className="space-y-5">

          <div>
            <label className="font-medium text-gray-700">Descrição</label>
            <input
              type="text"
              placeholder="Ex: Almoço, Uber, Netflix..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Valor</label>
            <input
              type="number"
              placeholder="Ex: 35.90"
              value={newValue}
              onChange={(e) => setNewValue(parseFloat(e.target.value) || 0)}
              required
              min="0.01"
              step="0.01"
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Categoria</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option>Alimentação</option>
              <option>Transporte</option>
              <option>Casa</option>
              <option>Lazer</option>
              <option>Outros</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            Registrar Despesa
          </button>

        </form>
      </div>

      {/* Total de despesas */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-700 text-right">
          Total:
          <span className="text-indigo-700 ml-2">
            R$ {expenses.reduce((t, x) => t + x.value, 0).toFixed(2)}
          </span>
        </h3>
      </div>

      {/* Lista */}
      {expenses.length > 0 ? (
        <ExpenseList
          expenses={expenses}
          onUpdateExpense={handleUpdateExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      ) : (
        <p className="text-center text-gray-500 mt-10">Nenhuma despesa registrada.</p>
      )}

    </div>
  );
}
