// models/pessoaModel.js
const DataTypes = require('sequelize');
const sequelize = require('../sequelize');

const Pessoa = sequelize.define('pessoas', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM('ATIVO', 'INATIVO', 'REMOVIDO'),
        allowNull: true,
    },
    cadastro: { // Renomeando o campo createdAt para cadastro
        type: DataTypes.DATE,
        allowNull: true,
        field: 'cadastro', // Nome real do campo no banco de dados
    },
    atualizacao: { // Renomeando o campo createdAt para cadastro
        type: DataTypes.DATE,
        allowNull: true,
        field: 'atualizacao', // Nome real do campo no banco de dados
    },
    token: {
        type: DataTypes.STRING
    },
}, {
    // Alias para createdAt e updatedAt
    // createdAt: 'cadastro',
    // updatedAt: 'atualizacao',
    // Desativa a criação automática de createdAt e updatedAt
    timestamps: false,
});

// export default Pessoa;
module.exports = Pessoa
