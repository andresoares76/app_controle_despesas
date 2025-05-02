import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Expense } from '@/types/expense';
import { useState } from 'react';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
}

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  const [selectedTab, setSelectedTab] = useState('all');
  console.log('Despesas recebidas no ExpenseList:', expenses);
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString('pt-BR'); // Corrigido formato para BR
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {} as Record<string, Expense[]>);

  const categories = Array.from(
    new Set(
      expenses
        .map((expense) => expense.category?.name) // Agora direto: category é objeto ou null
        .filter((name): name is string => Boolean(name))
    )
  );

  const filteredExpenses = selectedTab === 'all'
    ? expenses
    : expenses.filter(
        (expense) =>
          expense.category?.name?.toLowerCase() === selectedTab
      );

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">Todos</TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category} value={category.toLowerCase()}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={selectedTab}>
        <div className="grid gap-4">
          {Object.entries(groupedExpenses).map(([date, expensesOnDate]) => (
            <div key={date}>
              <h3 className="text-lg font-semibold mb-2">{date}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expensesOnDate
                  .filter((expense) => {
                    if (selectedTab === 'all') return true;
                    return expense.category?.name?.toLowerCase() === selectedTab;
                  })
                  .map((expense) => (
                    <Card key={expense.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {expense.title} 
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteExpense(expense.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {expense.amount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {expense.category?.name || 'Sem Categoria'}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default ExpenseList;
