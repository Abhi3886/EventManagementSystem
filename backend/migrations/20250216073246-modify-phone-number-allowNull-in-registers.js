'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('registers', 'phone_number', {
            type: Sequelize.STRING(15),
            allowNull: true, // Change this to `true` to allow null values
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('registers', 'phone_number', {
            type: Sequelize.STRING(15),
            allowNull: false, // Revert back to `false` if rolling back
        });
    },
};