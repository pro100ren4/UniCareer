'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasOne(models.User, 
        {
          foreignKey: 'user_id',
          as: 'user',
          onDelete: 'CASCADE',
        }
      )
    }
  }
  Company.init({
    user_id: { 
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    name: { 
      allowNull: false,
      type: DataTypes.STRING,
    },
    website: { 
      type: DataTypes.STRING,
    },
    description: { 
      type: DataTypes.TEXT,
    },
    verified: {
      defaultValue: false, 
      type: DataTypes.BOOLEAN,
    },
    contact_person: { 
      type: DataTypes.STRING,
    },
    logo_path: { 
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};