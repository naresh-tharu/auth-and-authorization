const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      let data = req.body
      schema.parse(data);
      next()
    } catch (exception) {
      console.log(exception)
      next(exception)
    }
  }
}
export default validateRequest;