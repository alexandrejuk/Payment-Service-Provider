const Sequelize = require('sequelize')

const Transaction = (sequelize) => {
  const Transaction = sequelize.define('transaction', {
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
    }
  })

  Transaction.associate = (models) => {
    models.transaction.belongsTo(models.company, {
      foreignKey: {
        allowNull: false,
      }
    })
  }

  return Transaction
}

module.exports = Transaction