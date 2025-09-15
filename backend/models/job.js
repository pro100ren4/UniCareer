'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'company',
        onDelete: 'CASCADE'
      })
      Job.hasMany(models.Application, {
        foreignKey: 'job_id',
        as: 'application',
        onDelete: 'CASCADE'
      })
    }
  }
  Job.init(
    {
      company_id: {
        allowNull: false,
        type: DataTypes.NUMBER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      requirements: {
        type: DataTypes.TEXT
      },
      type: {
        type: DataTypes.ENUM('internship', 'project', 'contest')
      },
      city: {
        type: DataTypes.STRING
      },
      remote: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      salary_fron: {
        type: DataTypes.DECIMAL(10, 2)
      },
      salary_to: {
        type: DataTypes.DECIMAL(10, 2)
      },
      status: {
        defaultValue: 'active',
        type: DataTypes.ENUM('active', 'closed', 'draft', 'moderation')
      }
    },
    {
      sequelize,
      modelName: 'Job'
    }
  )
  return Job
}
