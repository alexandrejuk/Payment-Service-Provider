const moment = require('moment')

const credit_card = 'credit_card'
const salesTaxCredit = .05
const salesTaxDebt = .03

const getFinalNumbersCard = value => value.slice(12)

const setStatusPayment = type => type === credit_card ? 'waiting_funds' : 'paid'

const setPaymentDate = (type, date) => {
  switch (type) {
    case credit_card:
      return moment(new Date(date)).add(30,'day')
    default:
      return date
  }
}

const transactionSpec = transactionData => {
  return ({
    ...transactionData,
    card_number: getFinalNumbersCard(transactionData.card_number),
  })
}

const salesTax = (type, total) => {
  switch (type) {
    case credit_card:
      return (total - (total*salesTaxCredit))
    default:
      return (total - (total*salesTaxDebt))
  }
}

const payableSpec = transactionData => {
  const { id, amount, payment_method, payment_date } = transactionData
  return ({
    transactionId: id,
    amount: salesTax(payment_method, amount),
    status: setStatusPayment(payment_method),
    payment_date: setPaymentDate(payment_method, payment_date)
  })
}

module.exports = {
  payableSpec,
  transactionSpec,
}