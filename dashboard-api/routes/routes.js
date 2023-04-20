const express = require("express");
const TestesController = require("../controllers/teste.controller");
const ClientesController = require("../controllers/clientes.controller");
const router = express.Router();

// AUTENTICAÇÃO

// router.post("/auth/admin", AuthController.autenticarTokenAdmin);

// TESTE
router.get("/testes/padrao", TestesController.testeUm);

//ADMINISTRADORES

//CLIENTES

// router.post("/cliente/create/admin", ClientesController.cadastro); // PRECISA DE AUTENTICAÇÃO

router.post("/cliente/cadastro", ClientesController.cadastroCliente);
router.get("/cliente/get", ClientesController.listagem);
router.post("/cliente/login", ClientesController.login);
router.delete("/cliente/delete", ClientesController.delete);

module.exports = router;
