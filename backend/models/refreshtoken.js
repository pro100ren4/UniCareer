'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshToken.init(
    {
      token: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      ip: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'RefreshToken'
    }
  )
  return RefreshToken
}
