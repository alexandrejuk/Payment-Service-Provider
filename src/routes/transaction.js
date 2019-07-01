const TransationController = require('../controllers/transaction')

module.exports = (app) => {
  const transationController = new TransationController()

  app.route('/api/v1/companies/:companyId/transactions')
    .get(async (req, res) => {
      const { data, statusCode } = await transationController.getAll(
        req.params.companyId
      )
      res.status(statusCode).json(data)
    })
    .post(async (req, res) => {
      const { data, statusCode } = await transationController.create(
        req.body,
        req.params.companyId,
      )
      res.status(statusCode).json(data)
    })
}