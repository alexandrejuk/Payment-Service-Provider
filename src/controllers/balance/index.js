const database = require('../../database')
const TransactionModel = database.model('transaction')
const PayableModel = database.model('payable')
const { defaultResponse, errorResponse } = require('../../utils')

const sumValues = (accumulator, currentValue) => accumulator + currentValue

class Balance {
  async getAll(companyId) {
    try {
      const payables = await PayableModel.findAll({
        include: [{
          model: TransactionModel,
          where: { companyId },
        }]
      })

      const waiting_funds = payables
        .filter(({ status }) => status === 'waiting_funds')
        .map(payable => payable.amount)
        .reduce(sumValues, 0)

      const available = payables
        .filter(({ status }) => status === 'paid')
        .map(payable => payable.amount)
        .reduce(sumValues, 0)
      
       const response = {
        waiting_funds,
        available,
      }
      
      return defaultResponse(response)
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Balance