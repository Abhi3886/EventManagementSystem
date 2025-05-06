"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Events", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      event_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      event_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      event_venue: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expected_participants: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      event_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizer_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizer_phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sponsorship_info: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      event_website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      additional_notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      organization_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target_audience: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Student",
      },
      event_manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "EventManagers", // Reference to Event Managers Table
          key: "id",
        },
        onDelete: "CASCADE",
      },
      experience: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      event_type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "free",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Events");
  },
};
