const express= require("express")
const user = express.Router() //root
const db = require("../db/conn") //make a connection

user.post('/login', async(req, res) => {

    let username = req.body.username
    let password = req.body.password

    let isComplete = username && password 

    if(isComplete){
        try{
            let queryResult = await db.authUser(username)
            //checks if user exists
            if(queryResult.length > 0){
                if(password == queryResult[0].password){
                    console.log(queryResult)
                }else{
                    console.log("incorrect password")
                }
            }else{
                console.log("User not registered")
            }
        }
        catch{
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("Please enter username and password")
    }
})

user.post('/register', async(req,res) =>{
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    let isComplete = username && password && email

    if(isComplete){
        try{
            let queryResult = await db.addUser(username, email, password)
            if(queryResult.affectedRows){
                console.log("new user added")
            }
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }else{
        console.log("A field is missing")
    }
    res.end()
})