require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'alterar-este-segredo-em-producao';

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', app: 'ISTECaminho', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'error', app: 'ISTECaminho', database: 'unavailable' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ message: 'Preencha todos os campos.' });
    if (senha.length < 6) return res.status(400).json({ message: 'A palavra-passe deve ter pelo menos 6 caracteres.' });

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) return res.status(409).json({ message: 'Já existe uma conta com este email.' });

    const passwordHash = await bcrypt.hash(senha, 10);
    const user = await prisma.user.create({
      data: { nome: nome.trim(), email: normalizedEmail, passwordHash }
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Não foi possível criar a conta.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: 'Preencha o email e a palavra-passe.' });

    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user || !(await bcrypt.compare(senha, user.passwordHash))) {
      return res.status(401).json({ message: 'Email ou palavra-passe incorretos.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Não foi possível iniciar sessão.' });
  }
});

const buildDir = path.join(__dirname, 'build');
if (fs.existsSync(buildDir)) {
  app.use(express.static(buildDir));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ message: 'Rota não encontrada.' });
    if (req.method === 'GET') return res.sendFile(path.join(buildDir, 'index.html'));
    next();
  });
}

app.listen(PORT, () => {
  console.log(`ISTECaminho disponível em http://localhost:${PORT}`);
});
