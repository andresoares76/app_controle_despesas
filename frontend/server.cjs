// server.cjs
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 8080;

// Configurar proxy para o backend
const BACKEND_URL = process.env.BACKEND_URL || 'http://URL-DO-SEU-BACKEND'; // Substitua pela URL real

app.use('/auth', createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
}));

app.use('/api', createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
}));

// Servir arquivos estáticos da pasta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Todas as requisições que não forem API ou Auth redirecionam para o index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
