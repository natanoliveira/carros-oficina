// controllers/pessoaController.js
const modelo = require('../models/pessoasCarrosModel');
const utils = require('../utils');

// Importo para poder pegar o nome de outra tabela pela chave estrangeira
const modeloPessoa = require('../models/pessoaModel');

const moduloBase = "carros_pessoas";

// Controlador para criar uma pessoa
exports.create = async (req, res) => {

    let { nome, placa, descricao, situacao, pessoa_id } = req.body;
    // const token = uuid.uuidv4();
    const token = utils.generateUUID();

    try {

        nome = nome.trim().toUpperCase();
        descricao = descricao ? descricao.trim().toUpperCase() : null;
        placa = placa ? placa.trim().toUpperCase() : null;

        const novaPessoa = await modelo.create({
            pessoa_id,
            nome,
            placa,
            descricao,
            situacao,
            token
        });

        res.status(201).json(novaPessoa);
    } catch (error) {
        console.error(error);
        utils.logSQL(error, moduloBase);
        res.status(500).json({ error: 'Erro ao criar pessoa' });
    }
};

exports.list = async (req, res) => {

    try {
        const pessoas = await modelo.findAll({
            include: [{
                model: modeloPessoa,
                as: 'pessoa',
                attributes: ['nome', 'sobrenome'], // Atributos que você deseja incluir no resultado
            }],
        });

        res.status(200).json(pessoas);
    } catch (error) {
        console.error(error);
        utils.logSQL(error, moduloBase);
        res.status(500).json({ error: 'Erro ao obter pessoas' });
    }
};

exports.listOne = async (req, res) => {

    const id = req.params.id;

    try {
        const dados = await modelo.findByPk(id);

        if (!dados) {
            return res.status(404).json({ error: 'Registro não encontrado' });
        }

        res.status(200).json(dados);

    } catch (error) {
        console.error(error);
        utils.logSQL(error, moduloBase);
        res.status(500).json({ error: 'Erro ao obter a pessoa' });
    }
};

exports.edit = async (req, res) => {

    const { id } = req.params;
    let { nome, placa, descricao, situacao } = req.body;

    try {
        const pessoa = await modelo.findByPk(id);

        if (!pessoa) {
            return res.status(404).json({ error: 'registro não encontrado' });
        }

        nome = nome.toUpperCase();
        descricao = descricao ?? descricao.toUpperCase();
        placa = placa ?? placa.toUpperCase();

        // Atualiza os dados da pessoa
        await pessoa.update({
            nome,
            placa,
            descricao,
            situacao
        });

        res.status(201).json(pessoa);
    } catch (error) {
        console.error(error);
        utils.logSQL(error, moduloBase);
        res.status(500).json({ error: 'Erro ao editar o registro' });
    }
};

exports.delete = async (req, res) => {

    const { id } = req.params;

    try {
        const pessoa = await modelo.findByPk(id);

        if (!pessoa) {
            return res.status(404).json({ error: 'registro não encontrado' });
        }

        // Atualiza os dados da pessoa
        await pessoa.destroy();

        res.status(201).json(pessoa);
    } catch (error) {
        console.error(error);
        utils.logSQL(error, moduloBase);
        res.status(500).json({ error: 'Erro ao deletar o registro' });
    }
};

exports.listForFather = async (req, res) => {

    const pessoa_id = req.params.pessoaId;

    try {
        const dados = await modelo.findAll({
            where: { pessoa_id },
            include: [{
                model: modeloPessoa,
                as: 'pessoa',
                attributes: ['nome', 'sobrenome'], // Atributos que você deseja incluir no resultado
            }],
        });

        if (!dados) {
            return res.status(404).json({ error: 'Registro não encontrado' });
        }

        res.status(200).json(dados);

    } catch (error) {
        console.error(error);
        utils.logSQL(error, moduloBase);
        res.status(500).json({ error: 'Erro ao obter a pessoa' });
    }
};