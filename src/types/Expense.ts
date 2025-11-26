// src/types/Expense.ts

/**
 * Interface que define a estrutura de uma Despesa (Expense).
 */
export interface Expense {
  id: number;
  description: string;
  value: number; // Armazenado como número para cálculos
  category: string; // Ex: Alimentação, Transporte, Casa
}