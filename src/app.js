const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const balanceRouter = require('./routes/balance')
const companyRouter = require('./routes/company')
const transactionRouter = require('./routes/transaction')

const app = Express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

balanceRouter(app)
companyRouter(app)
transactionRouter(app)

module.exports = app