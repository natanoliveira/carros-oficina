// controllers/pessoaController.js
const pessoaModel = require('../models/pessoaModel');
const utils = require('../utils');

const moduloBase = "pessoas";

// Controlador para criar uma pessoa
exports.create = async (req, res) => {

    let { nome, sobrenome, situacao } = req.body;
    // const token = uuid.uuidv4();
    const token = utils.generateUUID();

    try {

        nome = nome.toUpperCase();
        sobrenome = sobrenome.toUpperCase();

        const novaPessoa = await pessoaModel.create({
            nome,
            sobrenome,
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
        const pessoas = await pessoaModel.findAll();

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
        const dados = await pessoaModel.findByPk(id);

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
    let { nome, sobrenome, situacao } = req.body;

    try {
        const pessoa = await pessoaModel.findByPk(id);

        if (!pessoa) {
            return res.status(404).json({ error: 'registro não encontrado' });
        }

        nome = nome.toUpperCase();
        sobrenome = sobrenome.toUpperCase();

        // Atualiza os dados da pessoa
        await pessoa.update({
            nome,
            sobrenome,
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
        const pessoa = await pessoaModel.findByPk(id);

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
