const TransationController = require('../../../../controllers/transaction')
const CompanyController = require('../../../../controllers/company')
const { getFinalNumbersCard } = require('../../../../utils/transactionSpec')

const companyMock = {
  social_name: 'Company Name LTDA',
  cnpj: '11222333000100',
}

const transactionMock = {
  amount: 1000,
  card_number: '1111222233334444',
  card_cvv: '677',
  card_expiration_date: '1220',
  card_holder_name: 'Alexandre dos Santos Soares',
  description: 'PS4 Deluxe Pro',
  payment_method: 'debt_card',
  payment_date: 'Fri Jun 28 2019 15:43:37 GMT-0300 (Brasilia Standard Time)',
}

describe('Controllers: Transaction', () => {

  let transationController = null
  let companyId = null

  beforeAll(async () => {
    transationController = new TransationController()
    const companyController = new CompanyController()
    
    const { data: { id }} = await companyController.create(companyMock)
    companyId = id
  })
  
  describe('Get all transactions: getAll()', () => {
    test('should return a list of transactions', async () => {
      await transationController.create(transactionMock, companyId)
      await transationController.create(transactionMock, companyId)
      
      const { data } = await transationController.getAll(companyId)
      expect(data.length > 0).toBeTruthy()
    })
  })

  describe('Create a transaction: create()', () => {
    test('should create a transactions', async () => {
      const { data } = await transationController.create(transactionMock, companyId)

      expect(data.id).toBeTruthy()
      expect(data.amount).toBe(transactionMock.amount)
      expect(data.card_expiration_date).toBe(transactionMock.card_expiration_date)
      expect(data.card_number).toBe(getFinalNumbersCard(transactionMock.card_number))
      expect(data.card_cvv).toBe(transactionMock.card_cvv)
      expect(data.card_expiration_date).toBe(transactionMock.card_expiration_date)
      expect(data.card_holder_name).toBe(transactionMock.card_holder_name)
    })
  })
})
