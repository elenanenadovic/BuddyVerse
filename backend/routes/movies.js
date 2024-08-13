const express= require("express")
const movies = express.Router()
const db = require("../db/conn")


//when typing endpoint games
movies.get('/', async (req,res)=>{
    try{
        let queryResult = await db.allMovies();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})


movies.get('/:id', async (req, res, next) =>{
    try{
       // console.log(req)
        let queryResult = await db.oneMovie(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})


movies.post('/', async(req, res, next) => {

    //id 	genre 	ciema 	year 	name 	description
    let id = req.body.id
    let genre = req.body.genre
    let cinema = req.body.cinema
    let year = req.body.year
    let name = req.body.name
    let description = req.body.description
    let url = req.body.url

    let isComplete = id && genre && cinema && year && name && description && url
    if(isComplete){
        try{
            let queryResult = await db.createMovie(id, genre, cinema, year, name, description, url)
            if(queryResult.affectedRows){
                console.log("Movie is added")
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

module.exports = movies