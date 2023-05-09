const {body,validationResult} = require("express-validator")

const registerRules = () =>[
    body("name","Name is required").notEmpty(),
    body("lastName","LastName is required").notEmpty(),
    body("email","Email should be an email").isEmail(),
    body("password","Password must contain between 5 and 20 characters").isLength({
        min : 5,
        max : 20
    }),
]

const loginRules = () =>[
    body("email","Email should be an email").isEmail(),
    body("password","Password must contain between 5 and 20 characters").isLength({
        min : 5,
        max : 20
    }),
]

const validator = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    next()
}

module.exports = {registerRules,loginRules,validator}

