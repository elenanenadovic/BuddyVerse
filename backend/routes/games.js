const express= require("express")
const games = express.Router()
const db = require("../db/conn")

games.get('/',async (req,res)=>{
    try{
        let queryResult = await db.allGames();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = games
