const CompanyController = require('../../../../controllers/company')

const companyMock = {
  social_name: 'Company Name LTDA',
  cnpj: '11222333000100',
}

describe('Controllers: Transaction', () => {

  let companyController = null
  beforeEach(() => {
    companyController = new CompanyController()
  })
  
  describe('Create a company: create()', () => {
    test('should create a company', async () => {
      const { data: companyCreated } = await companyController.create(companyMock)

      expect(companyCreated.id).toBeTruthy()
      expect(companyCreated.social_name).toBe(companyMock.social_name)
      expect(companyCreated.cnpj).toBe(companyMock.cnpj)
    })
  })

  describe('Get a company: getById()', () => {
    test('should return a company', async() => {
      const { data: companyCreated } = await companyController.create(companyMock)
      const { data: companyFound } = await companyController.getById(companyCreated.id)

      expect(companyFound.id).toBe(companyCreated.id)
      expect(companyFound.social_name).toBe(companyCreated.social_name)
      expect(companyFound.cnpj).toBe(companyCreated.cnpj)
    })
  })
})
