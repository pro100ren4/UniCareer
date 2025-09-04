'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Application.hasOne(models.Job,
        {
          foreignKey: 'job_id',
          as: 'job',
          onDelete: 'CASCADE'
        }
      )
      Application.hasOne(models.Student,
        {
          foreignKey: 'student_id',
          as: 'student',
          onDelete: 'Cascade'
        }
      )
    }
  }
  Application.init({
    job_id: { 
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    student_id: { 
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    message: { 
      type: DataTypes.TEXT,
    },
    resume_snapshot_path: { 
      type: DataTypes.TEXT,
    },
    status: { 
      defaultValue: 'pending',
      type: DataTypes.ENUM('pending','accepted','rejected')
    },
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};