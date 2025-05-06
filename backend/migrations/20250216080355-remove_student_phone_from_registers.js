module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('registers', 'student_phone');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('registers', 'student_phone', {
      type: Sequelize.STRING(15),
      allowNull: true, // Adjust this based on your previous settings
    });
  }
};
