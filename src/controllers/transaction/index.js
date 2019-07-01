const database = require('../../database')
const TransactionModel = database.model('transaction')
const PayableModel = database.model('payable')

const { defaultResponse, errorResponse } = require('../../utils')
const { transactionSpec, payableSpec } = require('../../utils/transactionSpec')

class Transaction {
  async getAll() {
    try {
      const response = await TransactionModel.findAll({ raw: true })
      return defaultResponse(response)
    } catch (error) {
      return errorResponse(error)
    }
  }
  
  async create(transactionData) {
    const transaction = await database.transaction()
    try {
      const transactionResponse = await TransactionModel.create(
        transactionSpec(transactionData), { transaction }
      )
      
      await PayableModel.create(payableSpec(transactionResponse), { transaction })
      await transaction.commit()
      return defaultResponse(transactionResponse, 201)
    } catch (error) {
      await transaction.rollback()
      return errorResponse(error, 422)
    }
  }

  async getByid(id) {
    try {
      const response = await TransactionModel.findByPk(id)
      return defaultResponse(response)
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Transaction