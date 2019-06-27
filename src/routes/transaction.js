const TransationController = require('../controllers/transaction')

module.exports = (app) => {
  const transationController = new TransationController()

  app.route('/api/v1/transactions')
    .get(async (req, res) => {
      const { data, statusCode } = await transationController.getAll()
      res.status(statusCode).json(data)
    })
    .post(async (req, res) => {
      const { data, statusCode } = await transationController.create(req.body)
      res.status(statusCode).json(data)
    })

  app.route('/api/v1/transactions/:id')
    .get(async (req, res) => {
      const { data, statusCode } = await transationController.getByid(req.params.id)
      res.status(statusCode).json(data)
    })
}