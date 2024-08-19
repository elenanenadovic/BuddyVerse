const express= require("express")
const applications = express.Router()
const db = require("../db/conn")

applications.post('/', async(req, res, next) => {

    let id = req.body.id
    let m_id= req.body.m_id
    let phone = req.body.phone
    let p_id = req.body.p_id
    let text = req.body.text

    console.log(req.body.phone)

    let isComplete = id && p_id && m_id && text && phone

    if(isComplete){
        try{
            let queryResult = await db.createApplication(id, p_id, m_id, text, phone)
            if(queryResult.affectedRows){
                console.log("Application is added")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to add application")
        console.log(id)
        console.log(p_id)
        console.log(m_id)
        console.log(phone)
        console.log(text)
        
    }
    res.end()
})

module.exports = applications