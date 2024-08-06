const mysql = require('mysql2');

const  conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: "SISIII2024_89211095"
  })

let dataPool = {}

dataPool.allGames = () => {
    return new Promise((resolve,reject) => {
        conn.query(`SELECT * FROM Game`, (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })      
    })
} 
dataPool.oneGame=(id)=>{
    return new Promise ((resolve, reject)=>{
        conn.query(`SELECT * FROM Game WHERE id = ?`, id, (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

dataPool.createGame=(id,name,description,type,year)=>{
    return new Promise ((resolve, reject)=>{
        //passing to columns values linked through quotation marks, passing array
      conn.query(`INSERT INTO Game (id,name,description,type,year) VALUES (?,?,?,?,?)`, [id,name,description,type,year], (err,res)=>{
        if(err){return reject(err)}
        return resolve(res)
      })
    })
}

dataPool.authUser=(username)=>{
      return new Promise ((resolve, reject)=>{
        conn.query('SELECT * FROM User WHERE username = ?', username, (err,res, fields)=>{
          if(err){return reject(err)}
          return resolve(res)
        })
    })  
        
}
    
dataPool.addUser=(id, username,email,password)=>{
      return new Promise ((resolve, reject)=>{
        conn.query(`INSERT INTO User (id, username,email,password) VALUES (?,?,?,?)`, [id,username, email, password], (err,res)=>{
          if(err){return reject(err)}
          return resolve(res)
        })
    })
}
    
         
conn.connect((err) => {
      if(err){
          console.log("ERROR: " + err.message);
          return;    
      }
      console.log('Connection established');
})
  
module.exports = dataPool