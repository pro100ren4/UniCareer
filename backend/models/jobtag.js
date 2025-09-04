'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JobTag.belongsTo(models.Job,
        {
          foreignKey: 'job_id',
          as: 'jobtag',
          onDelete: 'CASCADE',
        }
      )
      JobTag.belongsTo(models.Tag,
        {
          foreignKey: 'tag_id',
          as: 'jobtag',
          onDelete: 'CASCADE',
        }
      )
    }
  }
  JobTag.init({
    job_id: { 
      allowNull: false,
      type:DataTypes.INTEGER,
    },
    tag_id: { 
      allowNull: false,
      type:DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'JobTag',
  });
  return JobTag;
};