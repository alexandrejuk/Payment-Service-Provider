const database = require('../../database')
const CompanyModel = database.model('company')
const { defaultResponse, errorResponse } = require('../../utils')

class Company {

  async create(companyData) {
    try {
      const companyResponse = await CompanyModel.create(companyData)
      return defaultResponse(companyResponse, 201)
    } catch (error) {
      return errorResponse(error, 422)
    }
  }

  async getById(id) {
    try {
      const response = await CompanyModel.findByPk(id)
      return defaultResponse(response)
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Company