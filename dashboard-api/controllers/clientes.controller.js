const { DatabaseError } = require("sequelize");
const ClientesModel = require("../models/clientes.model");
const { query } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ClientesController = {
	async cadastro(req, res) {
		try {
			if (!req.body.nome) {
				return res.status(400).send({
					status: 400,
					message: "Por favor ...",
					data: null,
				});
			}
			console.log(req.body);

			let query = await ClientesModel.create(req.body);

			if (query) {
				return res
					.status(200)
					.send({ status: 200, message: "ok", data: query });
			}
		} catch (err) {
			console.error(err);
			return res.status(500).send({
				status: 500,
				message: "algum erro geral",
				data: null,
				error: err,
			});
		}
	},

	async cadastroCliente(req, res) {
		try {
			if (!req.body.nome) {
				console.log(req.body.nome, req.body.email);
				return res.status(400).send({
					status: 400,
					message: "Por favor envie seu nome ...",
					data: null,
				});
			}

			let cliente = await ClientesModel.findOne({
				where: { email: req.body.email },
			});

			if (cliente) {
				return res.status(400).send({
					status: 400,
					message: "Já existe um cadastro com esse e-mail ...",
					data: null,
				});
			}

			req.body.password = await bcrypt.hash(req.body.password, 10);

			// GERAR O PAYLOAD DO TOKEN
			const payload = { email: req.body.email };

			// TOKEN

			// const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

			// req.body.token = token;

			let query = await ClientesModel.create(req.body);

			if (query) {
				return res
					.status(200)
					.send({ status: 200, message: "ok", data: query });
			}
		} catch (err) {
			console.error(err);
			return res.status(500).send({
				status: 500,
				message: "algum erro geral",
				data: null,
				error: err,
			});
		}
	},

	async login(req, res) {
		try {
			let { email, password } = req.body;

			if (!req.body) {
				return res.status(400).send({
					status: 400,
					message: "Envie seus dados corretamente.",
					data: null,
				});
			} else if (!email) {
				return res
					.status(400)
					.send({ status: 400, message: "Envie o seu email.", data: null });
			} else if (!password) {
				return res
					.status(400)
					.send({ status: 400, message: "Envie sua senha.", data: null });
			}

			let cliente = await ClientesModel.findOne({
				where: {
					email: email,
				},
			});

			if (cliente) {
				// CONTINUA LOGIN
				const match = await bcrypt.compare(password, cliente.password);

				if (match) {
					return res
						.status(200)
						.json({ status: 200, message: "ok", data: cliente });
				} else {
					return res.status(401).json({
						status: 401,
						message: "Usuário não encontrado, tente novamente.",
						data: null,
					});
				}
			} else {
				return res.status(404).send({
					status: 404,
					message: "Usuário não encontrado.",
					data: null,
				});
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.send({ status: 500, message: "Erro geral", data: null });
		}
	},

	async listagem(req, res) {
		try {
			const clientes = await ClientesModel.findAll();
			return res.status(200).send({ data: clientes });
		} catch (err) {
			console.error(err);
			return res.status(500).send({ error: err });
		}
		return res
			.status(200)
			.send({ data: { nome: query.nome, sobrenome: query.nome } });
	},

	async delete(req, res) {
		try {
			const { id } = req.body;

			// Remove o cliente com o id especificado
			const resultado = await ClientesModel.destroy({
				where: { id },
				force: true,
			});

			// Verifica se a remoção foi bem sucedida
			if (resultado === 1) {
				return res
					.status(200)
					.send({ message: `Cliente com id ${id} removido com sucesso.` });
			} else {
				return res.status(404).send({
					error: `Não foi possível encontrar o cliente com id ${id}.`,
				});
			}
		} catch (err) {
			console.error(err);
			return res.status(500).send({ error: err });
		}
	},
};

module.exports = ClientesController;
