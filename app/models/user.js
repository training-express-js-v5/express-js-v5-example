module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'users',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      underscored: true
    }
  );
  return user;
};
