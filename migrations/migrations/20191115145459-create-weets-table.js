'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('weets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        // eslint-disable-next-line new-cap
        type: Sequelize.STRING(140),
        allowNull: false
      },
      creator: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      updated_at: Sequelize.DATE,
      created_at: Sequelize.DATE
    }),
  down: queryInterface => queryInterface.dropTable('weets')
};
