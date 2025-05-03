// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Servir arquivos estáticos da pasta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Todas as requisições devem enviar o index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
