const express= require("express")
const games = express.Router()
const db = require("../db/conn")


//when typing endpoint games
games.get('/', async (req,res)=>{
    try{
        let queryResult = await db.allGames();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

games.get('/:id', async (req, res, next) =>{
    try{
       // console.log(req)
        let queryResult = await db.oneGame(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

games.post('/', async(req, res, next) => {

    //id,name,description,type,year
    let id = req.body.id
    let name = req.body.name
    let description = req.body.description
    let type = req.body.type
    let year = req.body.year

    console.log(req.body.id)
    console.log(req.body.name)
    console.log(req.body.description)

    let isComplete = name && description && type && year
    if(isComplete){
        try{
            let queryResult = await db.createGame(id,name,description,type,year)
            if(queryResult.affectedRows){
                console.log("Game is added")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to add a game")
    }
    res.end()
})

module.exports = games
