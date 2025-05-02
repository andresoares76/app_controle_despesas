import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import ExpenseList from '@/components/ExpenseList';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseSummary from '@/components/ExpenseSummary';
import ExpenseChart from '@/components/ExpenseChart';
import BackupControls from '@/components/BackupControls';
import { Expense } from '@/types/expense';
import { useSidebar } from '@/hooks/useSidebar';
import LoginForm from '@/components/LoginForm';
import api from '@/services/api';

export default function Index() {
  const { toggleSidebar } = useSidebar();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
  
    api.get('/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setIsAuthenticated(true);
      fetchExpenses();
    })
    .catch(() => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    });
  }, []);
  
  const fetchExpenses = async () => {
    try {
      const response = await api.get<Expense[]>('/despesas');
      console.log('Dados recebidos da API:', response.data);
      setExpenses(response.data);
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
    }
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

const handleDeleteExpense = async (id: number) => {
  try {
    await api.delete(`/despesas/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  } catch (error) {
    console.error('Erro ao excluir despesa:', error);
  }
};

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchExpenses();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <main className="flex-1 px-4 py-6 md:px-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Resumo</TabsTrigger>
            <TabsTrigger value="expenses">Despesas</TabsTrigger>
            <TabsTrigger value="account">Conta</TabsTrigger> 
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <ExpenseSummary expenses={expenses} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <ExpenseChart expenses={expenses} />
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/*<div className="space-y-6">
                <LoginForm />
              </div>*/}
              <div className="space-y-6">
                <BackupControls expenses={expenses} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}