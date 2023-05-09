const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth");
const { registerRules,loginRules,validator } = require("../middleware/Validator");
require("dotenv").config({path: "../config/.env"})
const User = require ("../models/userModel")


// router.get("/hello", (req,res) =>{
//     res.send("auth app")
// })

//register
//http://localhost:4200/api/auth/register
router.post("/register",registerRules(),validator, async (req,res) =>{
    const {name,lastName,email,password} = req.body;
    try {
        // //simple validation 
        // //check fields
        // if(!name || !lastName || !email || !password)
        // return res.status(400).json({msg: "Please enter all fields !"})
        //check for existing user
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg: "User already exists"})
        }
        //create new user
        user = new User ({name,lastName,email,password})
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        user.password = hashedPassword
        //save user
        await user.save()
        //sign user
        const payload ={
            id : user.id
        }
        //token
        const token = await jwt.sign(payload,process.env.secretOrKey,{expiresIn : 60*60})
        res.status(200).send({msg: "User registred successfully", user,token})
    } catch (error) {
        res.status(500).send({msg: "Register server error !"})
    }
})

//login
//http://localhost:4200/api/auth/login
router.post("/login",loginRules(),validator,async(req,res) =>{
    const {email,password} = req.body;
    try {
        // //check fields
        // if(!email || !password){
        //     return res.status(400).json({msg: "Please enter all fields"})
        // }
        //check user
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg: "User doesn't exist"})
        }
        //check password 
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg: "Bad credentials"})
        }
        //sign user
        const payload ={
            id : user.id,
            name : user.name
        }
        //token
        const token = await jwt.sign(payload,process.env.secretOrKey,{expiresIn : 60*60})
        res.status(200).send({msg: "User logged success",user,token})
    } catch (error) {
        res.status(500).send({msg: "login server error!"})
        console.log(error);
    }
})

//private routes
router.get("/user",isAuth,(req,res) =>{
    res.status(200).send({user: req.user})
})

module.exports = router