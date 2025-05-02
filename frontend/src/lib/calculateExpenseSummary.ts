import { Expense } from '@/types/expense';

interface ExpenseSummary {
  total: number;
  average: number;
  byMonth: Record<string, number>;
  byCategory: Record<string, number>;
}

export function calculateExpenseSummary(expenses: Expense[]): ExpenseSummary {
  const summary: ExpenseSummary = {
    total: 0,
    average: 0,
    byMonth: {},
    byCategory: {},
  };

  expenses.forEach((expense) => {
    summary.total += expense.amount;

    // Agrupar por mês
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    summary.byMonth[monthKey] = (summary.byMonth[monthKey] || 0) + expense.amount;

    // Agrupar por categoria
    const categoryName = expense.category?.name || 'Sem Categoria';
    summary.byCategory[categoryName] = (summary.byCategory[categoryName] || 0) + expense.amount;
  });

  summary.average = expenses.length > 0 ? summary.total / expenses.length : 0;

  return summary;
}
