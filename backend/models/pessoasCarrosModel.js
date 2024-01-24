// models/pessoaModel.js
const DataTypes = require('sequelize');
const sequelize = require('../sequelize');

const Pessoa = require('../models/pessoaModel');

// console.log(Pessoa);

const CarrosPessoas = sequelize.define('carros_pessoas', {
    pessoa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pessoas', // Nome da tabela de pessoas
            key: 'id',        // Nome da coluna referenciada na tabela de pessoas
        },
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descricao: {
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

CarrosPessoas.belongsTo(Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa' });

// export default Pessoa;
module.exports = CarrosPessoas
