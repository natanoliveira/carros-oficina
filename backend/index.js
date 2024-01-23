// index.js
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// import routes from './routes/';

// Carrega as variáveis de ambiente do arquivo .env
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Adiconando as rotas específicas
const pessoaRouter = require('./routes/pessoaRoutes');
const pessoasCarrosRouter = require('./routes/pessoasCarrosRoutes');

// Adiciona as rotas ao aplicativo
// app.use('/api', routes);

// Rota padrão
app.get('/', (req, res) => {
    res.send('Bem-vindo à API!');
});

// Aplicação das rotas
app.use('/pessoa', pessoaRouter);
app.use('/carro', pessoasCarrosRouter);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
