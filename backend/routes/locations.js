const express= require("express")
const locations = express.Router()
const db = require("../db/conn")


//when typing endpoint games
locations.get('/', async (req,res)=>{
    try{
        let queryResult = await db.allLocations();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})


locations.get('/:id', async (req, res, next) =>{
    try{
       // console.log(req)
        let queryResult = await db.oneLocation(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

locations.get('/comments/:id', async (req, res, next) =>{
    try{
       // console.log(req)
        let queryResult = await db.allLocationComments(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

locations.post('/like', async (req, res, next) =>{
    let id = req.body.id
    let likes = req.body.likes + 1
    let isComplete = id && likes

    console.log(id)
    console.log(likes)
    if(isComplete){
        try{
            let queryResult = await db.likeLocation(id, likes)
            if(queryResult.affectedRows){
                console.log("Location like is added")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to add a location")
    }
    res.end()
})

locations.post('/dislike', async (req, res, next) =>{
    let id = req.body.id
    let likes = req.body.likes + 1
    let isComplete = id && likes

    console.log(id)
    console.log(likes)
    if(isComplete){
        try{
            let queryResult = await db.dislikeLocation(id, likes)
            if(queryResult.affectedRows){
                console.log("Location like is added")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to add a location")
    }
    res.end()
})


locations.post('/', async(req, res, next) => {

    //	id 	address 	likes 	dislikes 	type 	description 	name 	url
    let id = req.body.id
    let address = req.body.address
    let likes = 0
    let dislikes = 0
    let type = req.body.type
    let description = req.body.description
    let name = req.body.name
    let url = req.body.url

    console.log(id)
    console.log(address)
    console.log(likes)
    console.log(dislikes)
    console.log(name)
    console.log(description)
    console.log(url)
    console.log(type)
    let isComplete = id && address && name && description && url && type
    if(isComplete){
        try{
            let queryResult = await db.createLocation(id, address, likes, dislikes, type, description, name, url)
            if(queryResult.affectedRows){
                console.log("Location is added")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to add a location")
    }
    res.end()
})

locations.post('/delete', async(req, res, next) => {

    //id,name,description,type,year

    let id = req.body.id

    console.log(id)
   

    let isComplete = id
    if(isComplete){
        try{
            let queryResult = await db.deleteLocation(id)
            if(queryResult.affectedRows){
                console.log("Location is deleted")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to delete a location")
    }
    res.end()
})



module.exports = locations