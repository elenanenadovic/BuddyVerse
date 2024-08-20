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



//SELECT * FROM Game_profile WHERE p_id = ?
games.get('/profil/:id', async (req, res, next) =>{
    try{
       console.log(req.params.id)

        let queryResult = await db.gamesProfile(req.params.id)
        console.log("Query result" + queryResult)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})


//SELECT p_id FROM Game_profile WHERE g_id = ?
games.get('/users/:id', async (req, res, next) =>{
    try{
    console.log("ELENA" + req.params.id)
        let queryResult = await db.allUsersGame(req.params.id)
        res.json(queryResult)
        console.log(queryResult)
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
    let url = req.body.url

    let isComplete = name && description && type && year && url
    if(isComplete){
        try{
            let queryResult = await db.createGame(id,name,description,type,year,url)
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

games.post('/profilpost', async(req, res, next) => {

    //id,name,description,type,year
    let id  = Math.floor(Math.random() * 300000)
    
    let p_id = req.body.p_id
    let g_id = req.body.g_id

    console.log(p_id)
   

    let isComplete = id && p_id && g_id
    if(isComplete){
        try{
            let queryResult = await db.createGameProfile(id,p_id,g_id)
            if(queryResult.affectedRows){
                console.log("Game_Profile is added")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to add a game_profile")
    }
    res.end()
})

games.post('/deletegameprofile', async(req, res, next) => {

    //id,name,description,type,year
    let id  = Math.floor(Math.random() * 300000)
    
    let p_id = req.body.p_id
    let g_id = req.body.g_id

    console.log(p_id)
   

    let isComplete = id && p_id && g_id
    if(isComplete){
        try{
            let queryResult = await db.deleteGameProfile(id,p_id,g_id)
            if(queryResult.affectedRows){
                console.log("Game_Profile is added")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to add a game_profile")
    }
    res.end()
})


games.post('/delete', async(req, res, next) => {

    //id,name,description,type,year

    let id = req.body.id

    console.log(id)
   

    let isComplete = id
    if(isComplete){
        try{
            let queryResult = await db.deleteGame(id)
            if(queryResult.affectedRows){
                console.log("Game is deleted")
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing to delete a game")
    }
    res.end()
})


module.exports = games
