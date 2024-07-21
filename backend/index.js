const express = require('express')
const app = express()
const port = 4567
const dotenv = require("dotenv")
dotenv.config()

const db = require("./db/conn")
const games = require("./routes/games")


app.get("/",(req,res)=>{
    res.send("hola")
})


app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})

//routes
app.use('/games', games);