'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class StudentTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentTag.belongsTo(models.Student, {
        foreignKey: 'student_id',
        as: 'student',
        onDelete: 'CASCADE'
      })
      StudentTag.belongsTo(models.Tag, {
        foreignKey: 'tag_id',
        as: 'tag',
        onDelete: 'CASCADE'
      })
    }
  }
  StudentTag.init(
    {
      student_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      tag_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'StudentTag'
    }
  )
  return StudentTag
}
