'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Student,
        {
          foreignKey: 'user_id',
          as: 'student',
          onDelete: 'CASCADE',
        }
      )
      User.hasOne(models.Company,
        {
          foreignKey: 'user_id',
          as: 'company',
          onDelete: 'CASCADE',
        }
      )
      User.hasMany(models.AdminLog,
        {
          foreignKey: 'admin_id',
          as: 'log',
          onDelete: 'CASCADE'
        }
      )
      User.hasMany(models.Notification,
        {
          foreignKey: 'user_id',
          as: 'notification',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('student', 'company', 'admin'),
      allowNull: false,
    },
    is_active: { 
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};