import { type Expense } from "../types/Expense";

// 🔥 API DO BACKEND C#
const API_URL = "http://localhost:5175/api";
const ENDPOINT = `${API_URL}/expenses`;

type NewExpenseData = Omit<Expense, "id">;

// ================= GET ALL =================
export async function fetchAllExpenses(): Promise<Expense[]> {
  try {
    const response = await fetch(ENDPOINT);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
    }

    const data: Expense[] = await response.json();
    return data;

  } catch (error) {
    console.error("Erro fetchAllExpenses:", error);
    throw error;
  }
}

// ================= POST =================
export async function createExpense(newExpense: NewExpenseData): Promise<Expense> {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar: ${response.status} ${response.statusText}`);
    }

    const createdExpense: Expense = await response.json();
    return createdExpense;

  } catch (error) {
    console.error("Erro createExpense:", error);
    throw error;
  }
}

// ================= PUT (UPDATE) =================
export async function updateExpense(
  id: number,
  updatedData: Partial<NewExpenseData>
): Promise<Expense> {
  try {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "PUT", // 🔥 C# usa PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar: ${response.status} ${response.statusText}`);
    }

    const updatedExpense: Expense = await response.json();
    return updatedExpense;

  } catch (error) {
    console.error("Erro updateExpense:", error);
    throw error;
  }
}

// ================= DELETE =================
export async function deleteExpense(id: number): Promise<void> {
  try {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir: ${response.status} ${response.statusText}`);
    }

    return;

  } catch (error) {
    console.error("Erro deleteExpense:", error);
    throw error;
  }
}
