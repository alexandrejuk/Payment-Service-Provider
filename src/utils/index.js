const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
})

const errorResponse = ({ message }, statusCode = 400) => defaultResponse({
  error: message,
}, statusCode)

module.exports = {
  defaultResponse,
  errorResponse,
}