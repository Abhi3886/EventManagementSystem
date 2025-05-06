'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignFaculty extends Model {
    static associate(models) {
      // Define association with Faculty
      AssignFaculty.belongsTo(models.Faculty, {
        foreignKey: 'facultyId',
        as: 'faculty',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Define association with Event
      AssignFaculty.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Define association with User (who assigned the faculty)
      AssignFaculty.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'assignedBy',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  AssignFaculty.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      }
    },
    facultyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Faculties',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'AssignFaculty',
  });

  return AssignFaculty;
};
