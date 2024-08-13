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


locations.post('/', async(req, res, next) => {

    //	id 	address 	likes 	dislikes 	type 	description 	name 	url
    let id = req.body.id
    let address = req.body.address
    let likes = req.body.likes
    let dislikes = req.body.dislikes
    let type = req.body.type
    let description = req.body.description
    let name = req.body.name
    let url = req.body.url


    let isComplete = id && address && likes && dislikes && name && description && url && type
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

module.exports = locations