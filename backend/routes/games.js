const express= require("express")
const games = express.Router();

games.get('/',(req,res)=>{
    console.log("The route has been reached")
    res.send("Games")
    })

module.exports = games
