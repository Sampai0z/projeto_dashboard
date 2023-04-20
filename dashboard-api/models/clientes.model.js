const { Model, DataTypes } = require("sequelize");

class ClientesModel extends Model {
	static init(sequelize) {
		super.init(
			{
				nome: { type: DataTypes.STRING, allowNull: true },
				sobrenome: { type: DataTypes.STRING, allowNull: true },
				celular: { type: DataTypes.STRING, allowNull: true },
				email: { type: DataTypes.STRING, allowNull: true },
				password: { type: DataTypes.STRING, allowNull: true },
				cep: { type: DataTypes.STRING, allowNull: true },
				endereco: { type: DataTypes.STRING, allowNull: true },
				numero: { type: DataTypes.STRING, allowNull: true },
				complemento: { type: DataTypes.STRING, allowNull: true },
				bairro: { type: DataTypes.STRING, allowNull: true },
				cidade: { type: DataTypes.STRING, allowNull: true },
				estado: { type: DataTypes.STRING, allowNull: true },
				createdAt: { type: DataTypes.DATE, allowNull: true },
				updatedAt: { type: DataTypes.DATE, allowNull: true },
			},
			{
				sequelize,
				tableName: "clientes",
			}
		);
	}

	static associate(models) {}
}

module.exports = ClientesModel;
