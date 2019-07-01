const Sequelize = require('sequelize')

const Payable = (sequelize) => {
  const Payable = sequelize.define('payable', {
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
  })

  Payable.associate = (models) => {
    models.payable.belongsTo(models.transaction, {
      foreignKey: {
        allowNull: false,
      }
    })
  }

  return Payable
}

module.exports = Payable