const express = require('express')
const cookieParser = require("cookie-parser")
const path = require('path')
const app = express()
const port = 4567
const dotenv = require("dotenv")
const cors = require("cors")


dotenv.config()


const games = require("./routes/games")
const user = require("./routes/user")
const movies = require("./routes/movies")
const locations = require("./routes/locations")
const platforms = require("./routes/platforms")
const profile = require("./routes/profile")
const comments = require("./routes/comments")
const applications = require("./routes/applications")


//to read json objects
app.use(express.static(path.join(__dirname, "build")))
app.use(cookieParser("somesecret"))
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin:["http://88.200.63.148:2304"],
    methods:["GET", "POST"],
    credentials: true
}))


//app.use(cors())
app.get("/",(req,res)=>{
   res.sendFile(path.join(__dirname, "build", "index.html"))
    res.send("nja")
})


app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})

//routes
app.use('/locations', locations)
app.use('/applications', applications)
app.use('/movies', movies)
app.use('/games', games);
app.use('/user', user);
app.use('/platforms', platforms);
app.use('/profile', profile);
app.use('/comments', comments);