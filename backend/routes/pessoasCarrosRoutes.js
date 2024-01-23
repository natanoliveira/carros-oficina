// routes/pessoaRoutes.js
const express = require('express');
const controller = require('../controllers/pessoasCarrosController');

const router = express.Router();

// Rota para criar uma pessoa
router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.listOne);
router.get('/pessoa/:pessoaId', controller.listForFather);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);

// Adicione outras rotas conforme necessário

// export default router;
module.exports = router
