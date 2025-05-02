import express from 'express';
import { listarCategorias, criarCategoria, atualizarCategoria, excluirCategoria } from '../controllers/categoryController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Listar categorias
router.get('/', authenticateToken, listarCategorias);

// Criar nova categoria
router.post('/', authenticateToken, criarCategoria);

// Atualizar categoria
router.put('/:id', authenticateToken, atualizarCategoria);

// Excluir categoria
router.delete('/:id', authenticateToken, excluirCategoria);

export default router;
