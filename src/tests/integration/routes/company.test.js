const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../../app')
const url = '/api/v1/companies'

const request = chai.use(chaiHttp).request(app)
const requester = request.keepOpen()

const companyMock = {
  social_name: 'Company Name LTDA',
  cnpj: '11222333000100',
}

describe('Routes: Companies', () => {
  describe('Route POST /companies', () => {
    test('should create a company', async () => {
      const { status, body } = await requester.post(url).send(companyMock)
      
      expect(body.id).toBeTruthy()
      expect(body.social_name).toBe(companyMock.social_name)
      expect(body.cnpj).toBe(companyMock.cnpj)
      expect(status).toBe(201)
    })

    test('should create a transaction without some fields', async () => {
      const { status, body } = await requester.post(url).send({ social_name: 'Company Name LTDA' })
      expect(body.error).toBeTruthy()
      expect(status).toBe(422)
    })
  })
  

  describe('Route GET /companies/:id', () => {
    test('should return a company', async () => {
      const { body: companyCreated } = await requester.post(url).send(companyMock)
      const { status, body } = await requester.get(`${url}/${companyCreated.id}`)
      
      expect(body.id).toBeTruthy()
      expect(body.social_name).toBe(companyMock.social_name)
      expect(body.cnpj).toBe(companyMock.cnpj)
      expect(status).toBe(200)
    })

    test('should return a error id null', async () => {
      const { status, body } = await requester.get(`${url}/null`)
      expect(body.error).toBeTruthy()
      expect(status).toBe(400)
    })
  })
})