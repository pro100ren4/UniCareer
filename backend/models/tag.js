'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.hasMany(models.StudentTag, {
        foreignKey: 'tag_id',
        as: 'tag',
        onDelete: 'CASCADE'
      })
    }
  }
  Tag.init(
    {
      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Tag'
    }
  )
  return Tag
}
