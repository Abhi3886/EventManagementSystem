module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define(
    'Register',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true, // Allow NULL for faculty members
      },
      role: {
        type: DataTypes.STRING(50), // Faculty role like "Judge", "Speaker"
        allowNull: true, // NULL for students
      },
      registered_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'registers',
      timestamps: true,
    }
  );

  Register.associate = (models) => {
    Register.belongsTo(models.User, { foreignKey: 'user_id' });
    Register.belongsTo(models.Event, { foreignKey: 'event_id' });
  };

  return Register;
};
