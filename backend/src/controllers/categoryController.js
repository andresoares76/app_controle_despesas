import { PrismaClient } from '../lib/prisma.js';

const prisma = new PrismaClient();

// Listar categorias do usuário logado
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categories.findMany({
      where: {
        user_id: req.user.id,
      },
    });
    res.json(categorias);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ erro: 'Erro ao buscar categorias' });
  }
};

// Criar uma nova categoria
export const criarCategoria = async (req, res) => {
  const { name } = req.body;

  try {
    const novaCategoria = await prisma.categories.create({
      data: {
        name,
        user_id: req.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ erro: 'Erro ao criar categoria' });
  }
};

// Atualizar categoria
export const atualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const categoriaExistente = await prisma.categories.findUnique({
      where: { id: Number(id) },
    });

    if (!categoriaExistente) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    if (categoriaExistente.user_id !== req.user.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para editar esta categoria' });
    }

    const categoriaAtualizada = await prisma.categories.update({
      where: { id: Number(id) },
      data: {
        name,
        updatedAt: new Date(),
      },
    });

    res.json(categoriaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ erro: 'Erro ao atualizar categoria' });
  }
};

// Excluir categoria
export const excluirCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const categoriaExistente = await prisma.categories.findUnique({
      where: { id: Number(id) },
    });

    if (!categoriaExistente) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    if (categoriaExistente.user_id !== req.user.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para excluir esta categoria' });
    }

    await prisma.categories.delete({
      where: { id: Number(id) },
    });

    res.json({ mensagem: 'Categoria excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(500).json({ erro: 'Erro ao excluir categoria' });
  }
};
