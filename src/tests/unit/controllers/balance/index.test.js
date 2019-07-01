const TransationController = require('../../../../controllers/transaction')
const CompanyController = require('../../../../controllers/company')
const BalanceController = require('../../../../controllers/balance')

const companyMock = {
  social_name: 'Company Name LTDA',
  cnpj: '11222333000100',
}

const transactionMock = payment_method => ({
  payment_method,
  amount: 1000,
  card_number: '1111222233334444',
  card_cvv: '677',
  card_expiration_date: '1220',
  card_holder_name: 'Alexandre dos Santos Soares',
  description: 'PS4 Deluxe Pro',
  payment_date: 'Fri Jun 28 2019 15:43:37 GMT-0300 (Brasilia Standard Time)',
})

describe('Controllers: Balance', () => {

  let companyId = null
  let balanceController = null
  let transationController = null

  beforeAll(async () => {
    transationController = new TransationController()
    balanceController = new BalanceController()
    const companyController = new CompanyController()
    
    const { data: { id }} = await companyController.create(companyMock)
    companyId = id
  })
  
  describe('Get balance total: getAll()', () => {
    test('should return balance values', async () => {
      await transationController.create(transactionMock('debt_card'), companyId)
      await transationController.create(transactionMock('debt_card'), companyId)
      await transationController.create(transactionMock('debt_card'), companyId)
      await transationController.create(transactionMock('credit_card'), companyId)
      
      const { data: { available, waiting_funds } } = await balanceController.getAll(companyId)
      expect(waiting_funds).toBe(950)
      expect(available).toBe(2910)
    })
  })
})