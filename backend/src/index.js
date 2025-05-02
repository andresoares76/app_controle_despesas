import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import despesaRoutes from './routes/despesaRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { validateToken } from './controllers/authController.js';

erroooooo
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/auth', userRoutes);
app.use('/despesas', despesaRoutes);
app.use('/categories', categoryRoutes);
app.get('/auth/validate', validateToken);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API Controle de Despesas funcionando!');
});

// Definir uma porta
const PORT = process.env.PORT || 3001;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
