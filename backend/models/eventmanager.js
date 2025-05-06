'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventManager extends Model {
    
    static associate(models) {
    }
  }
  EventManager.init({
    organizationName: DataTypes.STRING,
    eventManagerId: DataTypes.INTEGER,
    experience: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EventManager',
  });
  return EventManager;
};