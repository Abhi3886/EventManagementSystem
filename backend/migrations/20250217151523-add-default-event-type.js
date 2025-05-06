'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Events', 'event_type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'free', // Set default value to 'free'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Events', 'event_type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null, // Remove default value during rollback
    });
  }
};
