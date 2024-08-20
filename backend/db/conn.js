const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "SISIII2024_89211095"
})

let dataPool = {}

dataPool.allGames = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Game`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.allUsers = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM User`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.oneGame = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Game WHERE id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.createGame = (id, name, description, type, year, url) => {
  return new Promise((resolve, reject) => {

    conn.query(`INSERT INTO Game (id,name,description,type,year,url) VALUES (?,?,?,?,?,?)`, [id, name, description, type, year, url], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.deleteGame = (id) => {
  return new Promise((resolve, reject) => {

    conn.query(`DELETE FROM Game WHERE id = ?`, [id], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}
dataPool.deletePlatform = (id) => {
  return new Promise((resolve, reject) => {

    conn.query(`DELETE FROM Platform WHERE id = ?`, [id], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.deleteMovie = (id) => {
  return new Promise((resolve, reject) => {

    conn.query(`DELETE FROM Movie WHERE id = ?`, [id], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.deleteLocation = (id) => {
  return new Promise((resolve, reject) => {

    conn.query(`DELETE FROM Location WHERE id = ?`, [id], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}



dataPool.allMovies = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Movie`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}
dataPool.oneMovie = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Movie WHERE id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.createMovie = (id, genre, cinema, year, name, description, url) => {
  return new Promise((resolve, reject) => {

    conn.query(`INSERT INTO Movie (id, genre, ciema, year, name, description, url) VALUES (?,?,?,?,?,?, ?)`, [id, genre, cinema, year, name, description, url], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}


dataPool.allLocations = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Location`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}
dataPool.allLocationComments = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Location_comment WHERE l_id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.oneLocation = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Location WHERE id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.createLocation = (id, address, likes, dislikes, type, description, name, url) => {
  return new Promise((resolve, reject) => {

    conn.query(`INSERT INTO Location (id, address, likes, dislikes, type, description, name, url) VALUES (?,?,?,?,?,?,?,?)`, [id, address, likes, dislikes, type, description, name, url], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.createApplication = (id, p_id, m_id, text, phone) => {
  return new Promise((resolve, reject) => {

    conn.query(`INSERT INTO Application (id, p_id, m_id, text, phone) VALUES (?,?,?,?,?)`, [id, p_id, m_id, text, phone], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.allPlatforms = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Platform`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.allProfilePlatforms = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Platform WHERE id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.onePlatform = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Platform_profile WHERE p_id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      console.log(resolve(res))
      return resolve(res)
    })
  })
}


dataPool.gamesProfile = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Game_profile WHERE p_id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      console.log(resolve(res))
      return resolve(res)
    })
  })
}


dataPool.profileApplications = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Application WHERE p_id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      console.log(resolve(res))
      return resolve(res)
    })
  })
}


dataPool.deleteGameProfile = (id, p_id, g_id) => {
  return new Promise((resolve, reject) => {

    conn.query(`DELETE FROM Game_profile WHERE p_id = ? AND g_id = ? `, [p_id, g_id], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.createGameProfile = (id, p_id, g_id) => {
  return new Promise((resolve, reject) => {

    conn.query(`INSERT INTO Game_profile (id,  p_id, g_id) VALUES (?,?,?)`, [id, p_id, g_id], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}



dataPool.createPlatform = (id, name, description, url) => {
  return new Promise((resolve, reject) => {

    conn.query(`INSERT INTO Platform (id,  name, description, url) VALUES (?,?,?,?)`, [id, name, description, url], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}


//allUsersGame

dataPool.allUsersGame = (id) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT p_id FROM Game_profile WHERE g_id = ?', id, (err, res, fields) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })

}

dataPool.authUser = (username) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM User WHERE email = ?', username, (err, res, fields) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })

}

dataPool.addUser = (id, username, email, password) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO User (id, username,email,password) VALUES (?,?,?,?)`, [id, username, email, password], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}


dataPool.allProfiles = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Profile`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}
dataPool.oneProfile = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Profile WHERE u_id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.oneProfileP = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Profile WHERE id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}


dataPool.addPlatformProfile = (id, p_id, pp_id, nick) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO Platform_profile (id, p_id,pp_id,nick) VALUES (?,?,?,?)`, [id, p_id,pp_id,nick], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.platformId = (id) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT id FROM Platform WHERE name = ?', [id], (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
};






dataPool.createProfile = (id, age, surname, name, icon, city, description, u_id, nickname) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO Profile (id,age,surname,name,icon,city,description,u_id, nickname) VALUES (?,?,?,?,?,?,?,?,?)`, [id, age, surname, name, icon, city, description, u_id, nickname], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.postCommentLocation = (id, p_id, l_id, text) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO Location_comment (id, p_id, l_id, text) VALUES (?,?,?,?)`, [id, p_id, l_id, text], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.likeLocation = (id, likes) => {
  return new Promise((resolve, reject) => {
    conn.query(`UPDATE Location SET likes = ? WHERE id = ?`, [likes,id], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.dislikeLocation = (id, likes) => {
  return new Promise((resolve, reject) => {
    conn.query(`UPDATE Location SET dislikes = ? WHERE id = ?`, [likes,id], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}




conn.connect((err) => {
  if (err) {
    console.log("ERROR: " + err.message);
    return;
  }
  console.log('Connection established');
})

module.exports = dataPool