const chai = require('chai')
const chaiHttp = require('chai-http')
const { getFinalNumbersCard } = require('../../../utils/transactionSpec')
const app = require('../../../app')

const request = chai.use(chaiHttp).request(app)
const requester = request.keepOpen()

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

describe('Routes: Transaction', () => {

  let url = null

  beforeAll(async () => {
    const { body } = await requester.post('/api/v1/companies').send(companyMock)
    url = `/api/v1/companies/${body.id}/transactions`
  })

  describe('Route POST /companies/:companyId/transactions', () => {
    test('should create a transaction', async () => {
      const { status, body } = await requester.post(url).send(transactionMock)
      
      expect(body.id).toBeTruthy()
      expect(body.amount).toBe(transactionMock.amount)
      expect(body.card_expiration_date).toBe(transactionMock.card_expiration_date)
      expect(body.card_number).toBe(getFinalNumbersCard(transactionMock.card_number))
      expect(body.card_cvv).toBe(transactionMock.card_cvv)
      expect(body.card_expiration_date).toBe(transactionMock.card_expiration_date)
      expect(body.card_holder_name).toBe(transactionMock.card_holder_name)
      expect(status).toBe(201)
    })

    test('should create a transaction without some fields', async () => {
      const { status, body } = await requester.post(url).send({ card_cvv: '123' })
      expect(body.error).toBeTruthy()
      expect(status).toBe(422)
    })

  })
  
  describe('Route GET /companies/:companyId/transactions', () => {
    test('should return a list of transactions', async () => {
      
      await requester.post(url).send(transactionMock)
      await requester.post(url).send(transactionMock)
      await requester.post(url).send(transactionMock)

      const { status, body } = await requester.get(url)
      expect(body.length > 0).toBeTruthy()
      expect(status).toBe(200)
    })
    
    test('should return a error companyId null', async () => {
      const { status, body } = await requester.get('/api/v1/companies/null/transactions')
      expect(body.error).toBeTruthy()
      expect(status).toBe(400)
    })
  })
})
