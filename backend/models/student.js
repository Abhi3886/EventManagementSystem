'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
  
    static associate(models) {
     
    }
  }
  Student.init({
    prn: DataTypes.STRING,
    course: DataTypes.STRING,
    branch: DataTypes.STRING,
    year: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};