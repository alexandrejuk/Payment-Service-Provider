const CompanyController = require('../controllers/company')

module.exports = (app) => {
  const companyController = new CompanyController()

  app.route('/api/v1/companies')
    .post(async (req, res) => {
      const { data, statusCode } = await companyController.create(req.body)
      res.status(statusCode).json(data)
    })

  app.route('/api/v1/companies/:id')
    .get(async (req, res) => {
      const { data, statusCode } = await companyController.getById(req.params.id)
      res.status(statusCode).json(data)
    })
}