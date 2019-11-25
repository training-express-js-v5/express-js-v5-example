module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'weets',
    {
      content: {
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
  Weet.associate = models => {
    Weet.belongsTo(models.users, { as: 'user', foreignKey: 'userId' });
  };
  return Weet;
};
