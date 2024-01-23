// sequelize.js
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// console.log(process.env.DB_HOST);

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sua_base_de_dados',
    // logging: false,
});

// export default sequelize;
module.exports = sequelize;
