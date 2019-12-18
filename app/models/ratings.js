module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'ratings',
    {
      ratingUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weetId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true,
      underscored: true
    }
  );
  Rating.associate = models => {
    Rating.belongsTo(models.weets, { as: 'weet', foreignKey: 'weetId' });
  };
  return Rating;
};
