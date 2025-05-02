import pkg from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Fazer login
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.users.findUnique({
      where: { email: email },
    });

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.password_hash);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};
