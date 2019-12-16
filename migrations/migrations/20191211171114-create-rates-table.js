'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('rates', {
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
      })
      .then(() =>
        queryInterface.addColumn('users', 'score', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        })
      ),
  down: queryInterface =>
    Promise.all([queryInterface.dropTable('rates'), queryInterface.removeColumn('users', 'score')])
};
