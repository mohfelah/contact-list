const express = require("express")
const router = express.Router()
const contact = require("../models/contactModel")

//test routing
router.get("/hello", (req,res) =>{
    res.send("Hello routing")
})

//add contact
//method post
//path : http://localhost:5000/api/contact/user
router.post("/user",async (req,res) =>{
    try {
        //create a new contact with the model contact
        const newContact = new contact(req.body)
        //test if user has an name
        if(!req.body.name){
            res.status(400).send({message : "name is required"})
            return
        }
        //test if user has an email
        if(!req.body.email){
            res.status(400).send({massage : "email is required"})
            return
        }
        //save contact
        const response = await newContact.save()
        res.status(200).send({response : response, message : "saved"})
    } catch (error) {
        res.status(500).send({message : "can not save the user"})
        console.log(error)
    }
})

//get contacts
//method get
///path : http://localhost:5000/api/contact
router.get("/", async (req,res) =>{
    try {
        const result = await contact.find()
        res.status(200).send({response : result, message : "getting contacts"})
    } catch (error) {
        res.send({message : "can not get contacts"})
    }
})

//get one contact
//method get
//path : http://localhost:5000/api/contact/:id
router.get("/:id", async(req,res) =>{
    try {
        const result = await contact.findOne({_id : req.params.id})
        if(result){
            res.status(200).send({response : result, message : "getting contact by id"})
        }else{
            res.status(400).send({message : "no contact with such id"})
        }
    } catch (error) {
        res.send({message : "can not get contact by id"})
    }
})

//delete contact
//method delete
//path : http://localhost:5000/api/contact/:id
router.delete("/:id", async(req,res) =>{
    try {
        const result = await contact.deleteOne({_id : req.params.id})
        res.status(200).send({response : result, message : "deleting contact by id"})
    } catch (error) {
        res.send({message : "can not delete contact by id"})
    }
})

//update one contact
//method put
//path : http://localhost:5000/api/contact/:id
router.put("/:id", async(req,res) =>{
    try {
        const result = await contact.updateOne({_id : req.params.id},{$set : {...req.body}})
        if(result){
            const newResult = await contact.findOne({_id : req.params.id})
            res.status(200).send({response : newResult, message : "contact updated"})
        }else{
            res.status(400).send({message : "no user with such id"})
        }
    } catch (error) {
        res.status(500).send({message : "cannot update contact"})
    }
})



module.exports = router