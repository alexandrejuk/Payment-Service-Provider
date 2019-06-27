const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const transactionRouter = require('./routes/transaction')

const app = Express()

app.use(bodyParser.json())
app.use(cors())

transactionRouter(app)

module.exports = app