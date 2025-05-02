
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense } from '@/types/expense';
import { categories } from '@/lib/mockData';
import { calculateExpenseSummary } from '@/lib/calculateExpenseSummary';

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
  const summary = calculateExpenseSummary(expenses);
  
  // Prepare data for pie chart
  const pieData = Object.entries(summary.byCategory).map(([category, amount]) => ({
    name: categories[category as keyof typeof categories]?.label || category,
    value: amount
  }));
  
  // Prepare data for bar chart (last 6 months)
  const getMonthData = () => {
    const now = new Date();
    const monthsData = [];
    
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
      
      monthsData.push({
        name: month.toLocaleDateString('pt-BR', { month: 'short' }),
        total: summary.byMonth[monthKey] || 0
      });
    }
    
    return monthsData;
  };
  
  const barData = getMonthData();
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const COLORS = ['#9b87f5', '#4ade80', '#f87171', '#facc15', '#60a5fa', '#e879f9', '#2dd4bf', '#f59e0b', '#a3e635', '#c084fc'];

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Análise de Despesas</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="category">
          <TabsList className="mb-4">
            <TabsTrigger value="category">Por Categoria</TabsTrigger>
            <TabsTrigger value="month">Por Mês</TabsTrigger>
          </TabsList>
          <TabsContent value="category" className="space-y-4">
            <div className="h-[300px]">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), 'Valor']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Nenhum dado disponível</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {Object.entries(categories).map(([key, { label, color }]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div className={`h-3 w-3 rounded-full bg-${color}`} />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="month">
            <div className="h-[300px]">
              {barData.some(item => item.total > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) => 
                        value === 0 ? '0' : 
                        value < 1000 ? `${value}` : 
                        `${(value / 1000).toFixed(1)}K`
                      }
                    />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), 'Total']}
                    />
                    <Bar 
                      dataKey="total" 
                      fill="#9b87f5"
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Nenhum dado disponível</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
