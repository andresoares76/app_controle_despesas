export interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: {
    id: number;
    name: string;
  } | null; // Pode ser null se a despesa não tiver categoria
}

export type ExpenseCategory = 
  | 'food'
  | 'transportation'
  | 'housing'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'education'
  | 'shopping'
  | 'personal'
  | 'other';

export interface ExpenseSummary {
  total: number;
  byCategory: Record<ExpenseCategory, number>;
  byMonth: Record<string, number>; // key is YYYY-MM
  average: number;
}

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
