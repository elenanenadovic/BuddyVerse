const express= require("express")
const user = express.Router() //root
const db = require("../db/conn") //make a connection
const session = require("express-session")

user.use(session({
    secret: "somesecret",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires: 60*2
    }
}))

user.get("/login", (req,res)=>{
    if(req.session.user){
        res.send({
            logged:true,
            user:req.session.user
        })
    }else{
        res.send({logged:false})
    }
})

user.get("/", async (req, res)=>{
    try{
         let queryResult = await db.allUsers()
         res.json(queryResult)
     }
     catch(err){
         console.log(err)
         res.sendStatus(500)
     }
})

user.post('/login', async(req, res) => {
    //console.log(req.body.username)
    console.log(req.body.password)
    //let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    let isComplete = email && password 
    console.log(email)
    console.log(password)

    if(isComplete){
        try{
            let queryResult = await db.authUser(email)
            //checks if user exists
            if(queryResult.length > 0){
                if(password == queryResult[0].password){
                    //console.log(queryResult[0])
                    req.session.user = queryResult[0]
                    console.log(queryResult[0])
                    res.json([queryResult[0].username, queryResult[0].id])
                    console.log("SESSION VALID")
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
    let id = req.body.id
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    let isComplete = username && password && email

    if(isComplete){
        try{
            let queryResult = await db.addUser(id, username, email, password)
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

module.exports = user