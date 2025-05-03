// src/teste-prisma.js
import { PrismaClient } from '../lib/prisma.js';

// Instanciando o PrismaClient
const prisma = new PrismaClient();

async function main() {
  try {
    // Teste simples: listar categorias (ou qualquer tabela que você tenha)
    const categorias = await prisma.categories.findMany();
    console.log('Categorias encontradas:', categorias);
  } catch (error) {
    console.error('Erro ao testar Prisma:', error);
  } finally {
    // Fecha conexão
    await prisma.$disconnect();
  }
}

// Executa a função principal
main();
