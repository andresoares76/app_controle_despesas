import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import api from '@/services/api';

interface ExpenseFormProps {
  onAddExpense: (expense: any) => void;
}

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  // Buscar categorias reais do banco
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        toast.error('Erro ao carregar categorias.');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await api.post('/despesas', {
        title: description,
        amount: parseFloat(amount),
        date: date.toISOString(),
        category_id: Number(category),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const categoryName = categories.find(c => c.id === Number(category))?.name || '';

    const newExpense = {
      ...response.data,
      category: {
        name: categoryName
  }
};

onAddExpense(newExpense);


      setDescription('');
      setAmount('');
      setCategory('');
      setDate(new Date());
      setNotes('');
      setPaymentMethod('');
      setIsFormVisible(false);

      toast.success('Despesa cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
      toast.error('Erro ao cadastrar despesa.');
    }
  };

  return (
    <div className="flex justify-center mb-4">
      {!isFormVisible ? (
        <Button onClick={() => setIsFormVisible(true)} className="flex items-center gap-2">
          <PlusCircle size={16} />
          Nova Despesa
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <div className="flex justify-end">
            <Button type="button" variant="ghost" onClick={() => setIsFormVisible(false)}>
              <XCircle size={20} />
            </Button>
          </div>

          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {/* Seletor de Categoria Dinâmico */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {category
                  ? categories.find((c) => c.id.toString() === category)?.name
                  : 'Selecione uma categoria'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setCategory(cat.id.toString())}
                >
                  {cat.name}
                </Button>
              ))}
            </PopoverContent>
          </Popover>

          <Button type="submit" className="w-full">
            Adicionar Despesa
          </Button>
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;
