const TransationController = require('../../../../controllers/transaction')

const transactionMock = {
  amount: 1000,
  card_number: '1111222233334444',
  card_cvv: '677',
  card_expiration_date: '1220',
  card_holder_name: 'Alexandre dos Santos Soares',
  description: 'Smart buy now',
}

describe('Controllers: Transaction', () => {

  let transationController = null
  beforeEach(() => {
    transationController = new TransationController()
  })
  
  describe('Get all transactions: getAll()', () => {
    test('should return a list of transactions', async () => {
      await transationController.create(transactionMock)
      await transationController.create(transactionMock)
      
      const { data } = await transationController.getAll()
      expect(data.length > 0).toBeTruthy()
    });
  })

  describe('Get a transaction: getById()', () => {
    test('should return a transaction', async() => {
      const { data } = await transationController.create(transactionMock)
      const { data: response } = await transationController.getByid(data.id)
      expect(response.id).toBe(data.id)
      expect(response.amount).toBe(data.amount)
      expect(response.card_expiration_date).toBe(data.card_expiration_date)
      expect(response.card_number).toBe(data.card_number)
      expect(response.card_cvv).toBe(data.card_cvv)
      expect(response.card_expiration_date).toBe(data.card_expiration_date)
      expect(response.card_holder_name).toBe(data.card_holder_name)
    })
  })

  describe('Create a transaction: create()', () => {
    test('should create a transactions', async () => {
      const { data } = await transationController.create(transactionMock)

      expect(data.id).toBeTruthy()
      expect(data.amount).toBe(transactionMock.amount)
      expect(data.card_expiration_date).toBe(transactionMock.card_expiration_date)
      expect(data.card_number).toBe(transactionMock.card_number)
      expect(data.card_cvv).toBe(transactionMock.card_cvv)
      expect(data.card_expiration_date).toBe(transactionMock.card_expiration_date)
      expect(data.card_holder_name).toBe(transactionMock.card_holder_name)
    })
  })

})