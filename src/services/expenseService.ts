

import { type Expense } from '../types/Expense';

const API_URL = 'http://localhost:3001'; 
const ENDPOINT = `${API_URL}/expenses`; 


type NewExpenseData = Omit<Expense, 'id'>;

//  BUSCAR TODOS (GET) ---
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

//  CADASTRAR NOVO (POST) ---
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

//  ATUALIZAR EXISTENTE (PATCH) ---
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

//  EXCLUIR REGISTRO (DELETE) ---
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