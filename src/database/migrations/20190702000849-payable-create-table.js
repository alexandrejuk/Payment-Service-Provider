'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('payables', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status : {
      type: Sequelize.ENUM(['paid', 'waiting_funds']),
      allowNull: false,
    },
    payment_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    transactionId: {
      type: Sequelize.UUID,
      references: {
        model: 'transactions',
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

  down: (queryInterface) => queryInterface.dropTable('payables'),
}
