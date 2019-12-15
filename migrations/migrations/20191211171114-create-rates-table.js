'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('rates', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rating_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      weet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'weets',
          key: 'id'
        }
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_at: Sequelize.DATE,
      created_at: Sequelize.DATE
    }),
  down: queryInterface => queryInterface.dropTable('rates')
};
