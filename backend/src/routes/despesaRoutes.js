import express from 'express';
import { listarDespesas, criarDespesa, atualizarDespesa, excluirDespesa } from '../controllers/despesaController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota GET para listar despesas
router.get('/', authenticateToken, listarDespesas);

// Rota POST para criar nova despesa
router.post('/', authenticateToken, criarDespesa);

// Rota PUT para atualizar a despesa
router.put('/:id', authenticateToken, atualizarDespesa);

// Rota DELETE para excluir a despesa
router.delete('/:id', authenticateToken, excluirDespesa);

export default router;
