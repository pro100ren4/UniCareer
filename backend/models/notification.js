'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'notification',
        onDelete: 'CASCADE'
      })
    }
  }
  Notification.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING
      },
      payload: {
        allowNull: false,
        type: DataTypes.JSONB
      },
      read: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      sequelize,
      modelName: 'Notification'
    }
  )
  return Notification
}
