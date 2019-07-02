const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../../app')

const request = chai.use(chaiHttp).request(app)
const requester = request.keepOpen()

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

describe('Routes: Balance', () => {

  let url = null

  beforeAll(async () => {
    const { body } = await requester.post('/api/v1/companies').send(companyMock)
    url = `/api/v1/companies/${body.id}`
  })

  describe('Route GET /companies/:companyId/balance', () => {
    test('should return balance values', async () => {
      await requester.post(`${url}/transactions`).send(transactionMock('debt_card'))
      await requester.post(`${url}/transactions`).send(transactionMock('debt_card'))
      await requester.post(`${url}/transactions`).send(transactionMock('debt_card'))
      await requester.post(`${url}/transactions`).send(transactionMock('credit_card'))
      
      const { body, status } = await requester.get(`${url}/balance`)

      expect(body.waiting_funds).toBe(950)
      expect(body.available).toBe(2910)
      expect(status).toBe(200)
    })
  })
})
