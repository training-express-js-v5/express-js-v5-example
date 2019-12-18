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
      underscored: true
    }
  );
  Weet.associate = models => {
    Weet.belongsTo(models.users, { as: 'user', foreignKey: 'userId' });
    Weet.hasMany(models.ratings, { as: 'ratings', foreignKey: 'weetId' });
  };
  return Weet;
};
