const express = require('express')
const app = express()
const port = 4567
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()


const games = require("./routes/games")
const user = require("./routes/user")

//to read json objects
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin:["http://88.200.63.148:2304"],
    methods:["GET", "POST"],
    credentials: true
}))
//app.use(cors())
app.get("/",(req,res)=>{
    res.send("hola")
})


app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})

//routes
app.use('/games', games);
app.use('/user', user);