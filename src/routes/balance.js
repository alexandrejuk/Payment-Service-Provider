const BalanceController = require('../controllers/balance')

module.exports = (app) => {
  const balanceController = new BalanceController()

  app.route('/api/v1/companies/:companyId/balance')
    .get(async (req, res) => {
      const { data, statusCode } = await balanceController.getAll(
        req.params.companyId
      )
      res.status(statusCode).json(data)
    })
}