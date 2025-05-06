'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    
    static associate(models) {
      
    }
  }
  Faculty.init({
    facultyId: DataTypes.STRING,
    department: DataTypes.STRING,
    designation: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Faculty',
  });
  return Faculty;
};