const express= require("express")
const comments = express.Router()
const db = require("../db/conn")

comments.post('/locations', async(req, res, next) => {


    
    let id = req.body.id
    let p_id = req.body.p_id
    let l_id = req.body.l_id
    let text = req.body.text

    let isComplete = id && p_id && l_id && text

    if(isComplete){
        try{
            let queryResult = await db.postCommentLocation(id, p_id, l_id, text)
            if(queryResult.affectedRows){
                console.log("Location comment is added")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log(id)
        console.log(p_id)
        console.log(l_id)
        console.log(text)
        console.log("A field is missing to add a location game")
    }
    res.end()
})

module.exports = comments