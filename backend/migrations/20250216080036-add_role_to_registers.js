module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("registers", "student_phone", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("registers", "role", {
      type: Sequelize.STRING,
      allowNull: true, // Only applicable for faculty members
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("registers", "student_phone");
    await queryInterface.removeColumn("registers", "role");
  }
};
