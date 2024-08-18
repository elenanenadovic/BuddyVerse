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
       //console.log(req)
       console.log(req.params.id)
        let queryResult = await db.onePlatform(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

platforms.get('/profil/:id', async (req, res, next) =>{
    try{
       console.log("UPAO")
       console.log(req.params.id)
        let queryResult = await db.allProfilePlatforms(req.params.id)
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

platforms.post('/delete/', async(req, res, next) => {

    //id name description url
    let id = req.body.id

    console.log(id)
   

    let isComplete = id
    if(isComplete){
        try{
            let queryResult = await db.deletePlatform(id)
            if(queryResult.affectedRows){
                console.log("Platform is deleted")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to delete a platform")
    }
    res.end()
})

module.exports = platforms