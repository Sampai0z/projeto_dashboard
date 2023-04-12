const TestesController = {
  async testeUm(req,res){
    console.log("A ROTA TA FUNCIONANDO");
      return res.status(200).send("pagina ta ..")
  }
}

module.exports = TestesController;