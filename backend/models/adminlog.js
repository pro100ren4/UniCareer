'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AdminLog.belongsTo(models.User,
        {
          foreignKey: 'admin_id',
          as: 'log',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  AdminLog.init({
    admin_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    action: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    target: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'AdminLog',
  });
  return AdminLog;
};