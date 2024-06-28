var Ajv = require("ajv")
function validate(schema) {
    return function (req, res, next) {
        const ajv = new Ajv({ allErrors: true })
        const validate = ajv.compile(schema)
        const valid = validate(req.body)
        if (!valid) {
            return res.status(400).json(validate.errors)
        }
        next()
    }
}
module.exports= validate;

