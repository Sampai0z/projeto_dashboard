// importação
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// LISTAGEM DE ROTAS
const homeRouter = require("./routes/routes")

// LIGA O EXPRESS
const app = express();

const config = require('./config/config')
const {Sequelize} = require("sequelize")
const conection = new Sequelize(config.development)

// INICIALIZAÇÃO DOS MODELS

// ASSOCIAÇÃO DOS MODELS

// ROTA BASE DA API
app.use(cors())
app.use(bodyParser.urlencoded({exteended: false}))
app.use(bodyParser.json)
app.use(fileUpload())

//ROTAS
app.use("/api", homeRouter)

try {
  app.listen(3000,()=>{
    console.log("A API está ouvindo em http://localhost:3000")  
  })
} catch(error){
    console.log('Deu ruim')
    console.log(error)
}