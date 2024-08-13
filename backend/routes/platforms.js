const express= require("express")
const platforms = express.Router()
const db = require("../db/conn")


//when typing endpoint games
platforms.get('/', async (req,res)=>{
    try{
        let queryResult = await db.allPlatforms();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})


platforms.get('/:id', async (req, res, next) =>{
    try{
       // console.log(req)
        let queryResult = await db.onePlatform(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})


platforms.post('/', async(req, res, next) => {

    //id name description url
    let id = req.body.id
    let name = req.body.name
    let description = req.body.description
    let url = req.body.url

    let isComplete = id && name && description && url
    if(isComplete){
        try{
            let queryResult = await db.createPlatform(id, name, description, url)
            if(queryResult.affectedRows){
                console.log("Platform is added")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to add a movie")
    }
    res.end()
})

module.exports = platforms