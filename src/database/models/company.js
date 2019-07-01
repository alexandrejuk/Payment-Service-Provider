const Sequelize = require('sequelize')

const Company = (sequelize) => {
  const Company = sequelize.define('company', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    social_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cnpj: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  })

  Company.associate = (models) => {
    models.company.hasMany(models.transaction, {
      foreignKey: {
        allowNull: false,
      }
    })
  }

  return Company
}

module.exports = Company