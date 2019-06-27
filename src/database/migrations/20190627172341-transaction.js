'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transaction', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    card_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    card_cvv: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    card_expiration_date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    card_holder_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('transaction'),
}
