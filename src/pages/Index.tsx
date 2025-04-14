
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import ExpenseSummary from '@/components/ExpenseSummary';
import ExpenseChart from '@/components/ExpenseChart';
import ExpenseList from '@/components/ExpenseList';
import ExpenseForm from '@/components/ExpenseForm';
import LoginForm from '@/components/LoginForm';
import BackupControls from '@/components/BackupControls';
import { Expense } from '@/lib/types';
import { expenses as initialExpenses } from '@/lib/mockData';
import { toast } from 'sonner';

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.success('Despesa excluída com sucesso!');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 px-4 py-6 md:px-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="expenses">Despesas</TabsTrigger>
              <TabsTrigger value="account">Conta</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="space-y-6">
            <ExpenseSummary expenses={expenses} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <ExpenseChart expenses={expenses} />
            </div>
            <ExpenseForm onAddExpense={addExpense} />
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </TabsContent>
          
          <TabsContent value="expenses" className="space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <LoginForm />
              </div>
              <div className="space-y-6">
                <BackupControls expenses={expenses} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
