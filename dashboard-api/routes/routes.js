const express = require('express');
const TestesController = require("../controllers/teste.controller");

const router = express.Router();


//TESTE

router.get('/teste/foi', TestesController.testeUm)

module.exports = router;