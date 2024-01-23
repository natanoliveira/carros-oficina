// routes/pessoaRoutes.js
const express = require('express');
const pessoaController = require('../controllers/pessoaController');

const router = express.Router();

// Rota para criar uma pessoa
router.post('/', pessoaController.create);
router.get('/', pessoaController.list);
router.get('/:id', pessoaController.listOne);
router.put('/:id', pessoaController.edit);
router.delete('/:id', pessoaController.delete);

// Adicione outras rotas conforme necessário

// export default router;
module.exports = router
