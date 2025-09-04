'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.hasOne(models.User, { foreignKey: 'id', as: 'user', onDelete: 'CASCADE' })
    }
  }
  Student.init({
    user_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    full_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    university: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    faculty: {
      type: DataTypes.STRING,
    },
    course: {
      validate: {
        min: 1,
      },
      type: DataTypes.NUMBER,
    },
    phone: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT,
    },
    resume_path: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};