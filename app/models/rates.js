module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define(
    'rates',
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
  Rate.associate = models => {
    Rate.belongsTo(models.weets, { as: 'weet', foreignKey: 'weetId' });
  };
  return Rate;
};
