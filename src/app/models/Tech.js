import { Model, DataTypes } from 'sequelize';

class Tech extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'techs',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: 'tech_id',
      through: 'user_techs',
      as: 'users',
    });
  }
}

export default Tech;
