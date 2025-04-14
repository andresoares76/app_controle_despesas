
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Wallet, CreditCard, TrendingUp } from 'lucide-react';
import { Expense } from '@/lib/types';
import { calculateExpenseSummary } from '@/lib/mockData';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary = ({ expenses }: ExpenseSummaryProps) => {
  const summary = calculateExpenseSummary(expenses);
  
  // Get current month and year
  const date = new Date();
  const currentMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.total)}</div>
          <p className="text-xs text-muted-foreground">
            {expenses.length} transações
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary.byMonth[currentMonth] || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {expenses.filter(e => new Date(e.date).getMonth() === date.getMonth()).length} transações
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Média por Transação</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.average)}</div>
          <p className="text-xs text-muted-foreground">
            Por transação
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maior Categoria</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {Object.entries(summary.byCategory).length > 0 ? (
            <>
              <div className="text-2xl font-bold capitalize">
                {Object.entries(summary.byCategory)
                  .sort((a, b) => b[1] - a[1])[0][0]}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(
                  Object.entries(summary.byCategory)
                    .sort((a, b) => b[1] - a[1])[0][1]
                )}
              </p>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">
                Nenhuma transação
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseSummary;
