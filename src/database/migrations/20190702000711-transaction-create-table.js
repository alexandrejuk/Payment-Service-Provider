'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
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
    payment_method: {
      type: Sequelize.ENUM(['credit_card', 'debt_card']),
      allowNull: false,
    },
    payment_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    companyId: {
      type: Sequelize.UUID,
      references: {
        model: 'companies',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'restrict',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('transactions'),
}
