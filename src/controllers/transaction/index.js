const database = require('../../database')
const TransactionModel = database.model('transaction')
const { defaultResponse, errorResponse } = require('../../utils')

class Transaction {
  async getAll() {
    try {
      const response = await TransactionModel.findAll({ raw: true })
      return defaultResponse(response)
    } catch (error) {
      return errorResponse(error)
    }
  }

  async create(transaction) {
    try {
      const response = await TransactionModel.create(transaction)
      return defaultResponse(response, 201)
    } catch (error) {
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