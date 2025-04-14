
import { Expense, ExpenseCategory, User } from "./types";

// Sample user
export const currentUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
};

// Sample expense categories with icons and colors
export const categories: Record<ExpenseCategory, { label: string, color: string }> = {
  food: { label: "Alimentação", color: "expense-green" },
  transportation: { label: "Transporte", color: "expense-blue" },
  housing: { label: "Moradia", color: "expense-purple" },
  utilities: { label: "Serviços", color: "expense-yellow" },
  entertainment: { label: "Entretenimento", color: "expense-red" },
  healthcare: { label: "Saúde", color: "expense-green" },
  education: { label: "Educação", color: "expense-blue" },
  shopping: { label: "Compras", color: "expense-purple" },
  personal: { label: "Pessoal", color: "expense-yellow" },
  other: { label: "Outros", color: "expense-red" }
};

// Sample expenses
export const expenses: Expense[] = [
  {
    id: "1",
    description: "Supermercado",
    amount: 150.75,
    date: "2023-04-01T10:30:00Z",
    category: "food"
  },
  {
    id: "2",
    description: "Aluguel",
    amount: 1200.00,
    date: "2023-04-05T09:00:00Z",
    category: "housing"
  },
  {
    id: "3",
    description: "Uber",
    amount: 25.50,
    date: "2023-04-02T18:45:00Z",
    category: "transportation"
  },
  {
    id: "4",
    description: "Netflix",
    amount: 39.90,
    date: "2023-04-10T21:00:00Z",
    category: "entertainment"
  },
  {
    id: "5",
    description: "Farmácia",
    amount: 87.20,
    date: "2023-04-08T14:20:00Z",
    category: "healthcare"
  },
  {
    id: "6",
    description: "Conta de luz",
    amount: 120.35,
    date: "2023-04-15T11:10:00Z",
    category: "utilities"
  },
  {
    id: "7",
    description: "Restaurante",
    amount: 85.60,
    date: "2023-04-16T20:30:00Z",
    category: "food"
  },
  {
    id: "8",
    description: "Livros",
    amount: 110.90,
    date: "2023-04-20T15:40:00Z",
    category: "education"
  },
  {
    id: "9",
    description: "Shopping",
    amount: 250.45,
    date: "2023-04-22T13:25:00Z",
    category: "shopping"
  },
  {
    id: "10",
    description: "Salão de beleza",
    amount: 95.00,
    date: "2023-04-25T16:15:00Z",
    category: "personal"
  }
];

// Function to generate a random expense (for testing)
export const generateRandomExpense = (): Expense => {
  const categories: ExpenseCategory[] = [
    "food", "transportation", "housing", "utilities", 
    "entertainment", "healthcare", "education", 
    "shopping", "personal", "other"
  ];
  
  const descriptions = [
    "Supermercado", "Restaurante", "Uber", "Combustível", 
    "Aluguel", "Energia", "Internet", "Cinema", 
    "Farmácia", "Curso", "Roupas", "Presente"
  ];
  
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
  const randomAmount = parseFloat((Math.random() * 1000).toFixed(2));
  
  // Random date from the last 30 days
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
  
  return {
    id: Math.random().toString(36).substring(2, 9),
    description: randomDescription,
    amount: randomAmount,
    date: randomDate.toISOString(),
    category: randomCategory
  };
};

// Calculate summary stats
export const calculateExpenseSummary = (expenses: Expense[]) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate by category
  const byCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);
  
  // Calculate by month
  const byMonth = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[monthKey] = (acc[monthKey] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const average = total / expenses.length;
  
  return {
    total,
    byCategory,
    byMonth,
    average
  };
};
