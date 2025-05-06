'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    
    static associate(models) {
      
    }
  }
  Event.init({
    event_title: DataTypes.STRING,
    event_category: DataTypes.STRING,
    event_description: DataTypes.TEXT,
    event_date: DataTypes.DATE,
    event_time: DataTypes.TIME,
    event_venue: DataTypes.STRING,
    expected_participants: DataTypes.INTEGER,
    event_image: DataTypes.STRING,
    organizer_name: DataTypes.STRING,
    organizer_email: DataTypes.STRING,
    organizer_phone: DataTypes.STRING,
    sponsorship_info: DataTypes.TEXT,
    event_website: DataTypes.STRING,
    additional_notes: DataTypes.TEXT,
    organization_name: DataTypes.STRING,
    target_audience: DataTypes.STRING,
    event_manager_id: DataTypes.INTEGER,
    experience: DataTypes.STRING,
    status: DataTypes.STRING,
    event_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};