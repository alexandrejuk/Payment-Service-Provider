const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../../app')
const url = '/api/v1/transactions'

const request = chai.use(chaiHttp).request(app)
const requester = request.keepOpen()

const transactionMock = {
  amount: 1000,
  card_number: '1111222233334444',
  card_cvv: '677',
  card_expiration_date: '1220',
  card_holder_name: 'Alexandre dos Santos Soares',
  description: 'Smart buy now',
}

describe('Routes: Transaction', () => {
  describe('Route POST /transactions', () => {
    test('should create a transaction', async () => {
      const { status, body } = await requester.post(url).send(transactionMock)
      
      expect(body.id).toBeTruthy()
      expect(body.amount).toBe(transactionMock.amount)
      expect(body.card_expiration_date).toBe(transactionMock.card_expiration_date)
      expect(body.card_number).toBe(transactionMock.card_number)
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
  
  describe('Route GET /transactions', () => {
    test('should return a list of transactions', async () => {
      const { status, body } = await requester.get(url)
      expect(body.length > 0).toBeTruthy()
      expect(status).toBe(200)
    })
  })

  describe('Route GET /transactions/:id', () => {
    test('should return a transaction', async () => {
      const { body: created } = await requester.post(url).send(transactionMock)
      const { status, body } = await requester.get(`${url}/${created.id}`)
      
      expect(body.id).toBe(created.id)
      expect(body.amount).toBe(created.amount)
      expect(body.card_expiration_date).toBe(created.card_expiration_date)
      expect(body.card_number).toBe(created.card_number)
      expect(body.card_cvv).toBe(created.card_cvv)
      expect(body.card_expiration_date).toBe(created.card_expiration_date)
      expect(body.card_holder_name).toBe(created.card_holder_name)
      expect(status).toBe(200)
    })

    test('should return a error id null', async () => {
      const { status, body } = await requester.get(`${url}/null`)
      expect(body.error).toBeTruthy()
      expect(status).toBe(400)
    })
  })

})