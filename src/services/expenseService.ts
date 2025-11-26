

import { type Expense } from '../types/Expense'; // Importação do novo tipo

// URL base da sua API do JSON Server, AGORA com o endpoint /expenses
const API_URL = 'http://localhost:3001'; 
const ENDPOINT = `${API_URL}/expenses`; // Novo endpoint

/**
 * Interface para dados de criação, omitindo o ID.
 */
type NewExpenseData = Omit<Expense, 'id'>;

// --- FUNÇÃO 1: BUSCAR TODOS (GET) ---
export async function fetchAllExpenses(): Promise<Expense[]> {
  try {
    const response = await fetch(ENDPOINT);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
    }

    const data: Expense[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// --- FUNÇÃO 2: CADASTRAR NOVO (POST) ---
export async function createExpense(newExpense: NewExpenseData): Promise<Expense> {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense), 
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar: ${response.status} ${response.statusText}`);
    }

    const createdExpense: Expense = await response.json();
    return createdExpense;
  } catch (error) {
    throw error;
  }
}

// --- FUNÇÃO 3: ATUALIZAR EXISTENTE (PATCH) ---
export async function updateExpense(id: number, updatedData: Partial<NewExpenseData>): Promise<Expense> {
  try {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), 
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar: ${response.status} ${response.statusText}`);
    }

    const updatedExpense: Expense = await response.json();
    return updatedExpense;
  } catch (error) {
    throw error;
  }
}

// --- FUNÇÃO 4: EXCLUIR REGISTRO (DELETE) ---
export async function deleteExpense(id: number): Promise<void> {
    try {
        const response = await fetch(`${ENDPOINT}/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir o post: ${response.status} ${response.statusText}`);
        }
        return;
    } catch (error) {
        throw error;
    }
}