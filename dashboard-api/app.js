// importação
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// LISTAGEM DE ROTAS

const homeRouter = require("./routes/routes");

// START NO EXPRESS
const app = express();

const config = require("./config/config");
const { Sequelize } = require("sequelize");
const ClientesModel = require("./models/clientes.model");
const conection = new Sequelize(config.development);

// INICIALIZAÇÃO DOS MODELS

ClientesModel.init(conection);

// ASSOCIAÇÃO DOS MODELS
ClientesModel.associate(conection.models);

// ROTA BASE DA API
app.use(cors()); // ATIVA O CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

//ROTAS
app.use("/api", homeRouter);

try {
	app.listen(3000, () => {
		console.log("A API está ouvindo em http://localhost:3000");
	});
} catch (error) {
	console.log("Erro ao iniciar server...");
	console.log(error);
}
