const { Model, DataTypes } = require("sequelize");

class BaseModel extends Model {
  static init(sequelize) {
    super.init(
      {
        nome:{type:DataTypes.STRING, allowNull:true},
      },
      {
        sequelize,
        tableName: "nome_da_tabela",
      }
    );
  }

  static associate(models) {

  }
}

module.exports = BaseModel;