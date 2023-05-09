const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
require("dotenv").config({path : "../config/.env"})

const isAuth = async(req,res,next) =>{
    try {
        const token = req.headers["x-auth-token"]
        //check for token
        if(!token){
            return res.status(400).send({msg: "No token unauthorized"})
        }
        const decoded = await jwt.verify(token, process.env.secretOrKey)
        //get user by id from payload
        const user = await User.findById(decoded.id)
        //check user
        if(!user){
            return res.status(400).send({msg: "unauthorized"})
        }
        //get user
        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({msg: "Token is not valid"})
    }
}

module.exports = isAuth