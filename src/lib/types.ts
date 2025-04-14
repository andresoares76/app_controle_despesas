
export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO string
  category: ExpenseCategory;
  paymentMethod?: string;
  notes?: string;
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
