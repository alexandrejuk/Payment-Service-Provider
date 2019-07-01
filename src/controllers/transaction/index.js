const database = require('../../database')
const TransactionModel = database.model('transaction')
const PayableModel = database.model('payable')
const { defaultResponse, errorResponse } = require('../../utils')
const { transactionSpec, payableSpec } = require('../../utils/transactionSpec')

class Transaction {
  async getAll(companyId) {
    try {
      const response = await PayableModel.findAll({
        include:[
          { model: TransactionModel, where: { companyId } }
        ]
      })
      return defaultResponse(response)
    } catch (error) {
      return errorResponse(error)
    }
  }
  
  async create(transactionData, companyId) {
    const transaction = await database.transaction()
    try {
      const transactionResponse = await TransactionModel.create(
        transactionSpec({...transactionData, companyId}), { transaction }
      )
      
      await PayableModel.create(
        payableSpec(transactionResponse), { transaction }
      )

      await transaction.commit()
      return defaultResponse(transactionResponse, 201)
    } catch (error) {
      await transaction.rollback()
      return errorResponse(error, 422)
    }
  }
}

module.exports = Transaction