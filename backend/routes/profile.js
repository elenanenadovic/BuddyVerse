const express= require("express")
const profile = express.Router()
const db = require("../db/conn")


//when typing endpoint games
profile.get('/', async (req,res)=>{
    try{
        let queryResult = await db.allProfiles();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})



profile.get('/:id', async (req, res, next) =>{
    try{
        let queryResult = await db.oneProfile(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})


profile.get('/profil/:id', async (req, res, next) =>{
    try{
        let queryResult = await db.oneProfileP(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})




profile.post('/', async(req, res, next) => {

    //id 	age 	surname 	name 	icon 	city 	description 	u_id
    let id = req.body.id
    let age = req.body.age
    let surname = req.body.surname
    let name = req.body.name
    let icon = req.body.icon
    let city = req.body.city
    let description = req.body.description
    let u_id = req.body.uid

    let isComplete = name && age && id && surname && icon && city && description && u_id
    if(isComplete){
        try{
            let queryResult = await db.createProfile(id,age,surname,name,icon,city,description,u_id)
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

module.exports = profile
