import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Buscar todas as despesas
export const listarDespesas = async (req, res) => {
  try {
    const despesas = await prisma.expenses.findMany({
      include: {
        category: true, 
      },
      where: {
        user_id: req.user.id, // Buscar só as despesas do usuário logado
      },
    });
    res.json(despesas);
  } catch (error) {
    console.error('Erro ao listar despesas:', error);
    res.status(500).json({ erro: 'Erro ao buscar despesas' });
  }
};

// Criar uma nova despesa
export const criarDespesa = async (req, res) => {
  const { title, amount, date, category_id } = req.body;

  try {
    const novaDespesa = await prisma.expenses.create({
      data: {
        title,
        amount: parseFloat(amount),
        date: new Date(date),
        category_id,
        user_id: req.user.id, // Associar ao usuário logado
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json(novaDespesa);
  } catch (error) {
    console.error('Erro ao criar despesa:', error);
    res.status(500).json({ erro: 'Erro ao criar despesa' });
  }
};

// Atualizar uma despesa existente
export const atualizarDespesa = async (req, res) => {
  const { id } = req.params;
  const { title, amount, date, category_id } = req.body;

  try {
    // Verificar se a despesa pertence ao usuário logado
    const despesaExistente = await prisma.expenses.findUnique({
      where: { id: Number(id) },
    });

    if (!despesaExistente) {
      return res.status(404).json({ erro: 'Despesa não encontrada' });
    }

    if (despesaExistente.user_id !== req.user.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para editar esta despesa' });
    }

    const despesaAtualizada = await prisma.expenses.update({
      where: { id: Number(id) },
      data: {
        title,
        amount: parseFloat(amount),
        date: new Date(date),
        category_id,
        updatedAt: new Date(),
      },
    });

    res.json(despesaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error);
    res.status(500).json({ erro: 'Erro ao atualizar despesa' });
  }
};

// Excluir uma despesa existente
export const excluirDespesa = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar se a despesa pertence ao usuário logado
    const despesaExistente = await prisma.expenses.findUnique({
      where: { id: Number(id) },
    });

    if (!despesaExistente) {
      return res.status(404).json({ erro: 'Despesa não encontrada' });
    }

    if (despesaExistente.user_id !== req.user.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para excluir esta despesa' });
    }

    await prisma.expenses.delete({
      where: { id: Number(id) },
    });

    res.json({ mensagem: 'Despesa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir despesa:', error);
    res.status(500).json({ erro: 'Erro ao excluir despesa' });
  }
};

