const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const companyRouter = require('./routes/company')
const transactionRouter = require('./routes/transaction')

const app = Express()

app.use(bodyParser.json())
app.use(cors())

companyRouter(app)
transactionRouter(app)

module.exports = app