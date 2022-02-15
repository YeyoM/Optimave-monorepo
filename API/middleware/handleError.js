const ERROR_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'ID is malformed' }),
  ValidationError: (res, err) => res.status(409).send({ error: err.message }),
  JsonWebTokenError: res => res.status(401).send({ error: 'token missing or invalid' }),
  TokenExpiredError: res => res.status(498).send({ error: 'token Expired' })
}
module.exports = (err, req, res, next) => {
  console.log(err)
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
  handler(res, err)
}
