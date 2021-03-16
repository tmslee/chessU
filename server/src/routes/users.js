const router = require("express").Router();
const jwt = require('jsonwebtoken');

module.exports = db => {
  router.get('/users', async (req, res) => {
    try {
      const allUsers = await db.query(`SELECT * FROM users;`);
      res.json(allUsers.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  router.get('/users/:id', async (req, res) => {
    user_id = req.params.id;
    try {
      const individualUser = await db.query(`SELECT * FROM users where id = $1;`, [`${user_id}`]);
      res.json(individualUser.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  })

  router.post('/users', async (req, res) => {
    const {username, email, password} = req.body;
    try{
      const newUser = await db.query(`
        INSERT INTO users (username, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING *;`, [username, email, password]
      )
      req.session.userId = user.id;
      res.json(newUser.rows);
    } catch (err){
      res.send(err.message);
    }

    // db.query(`
    // INSERT INTO users (username, email, password) 
    // VALUES ($1, $2, $3) 
    // RETURNING *;`, [username, email, password]
    // )
    // .then( user => res.json(user.rows))
    // .catch( err => res.send(err.message))
  })

  
  router.put('/users/:id', async (req, res) => {
    const {username, email, password} = req.body;
    const id = req.params.id;
    console.log(id, 'ID IS HERE')
    try{
      const editUser = await db.query(`
      UPDATE users SET 
        username=$1::text, 
        email=$2::text, 
        password=$3::text
      WHERE id = $4::integer 
      RETURNING *;`, [username, email, password, id]
      )
      res.json(editUser.rows);
    } catch (err){
      console.error(err.message);
    }
  });

  router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try{
      const deleteUser = await db.query(`
      DELETE FROM users 
      WHERE id = $1::integer
      RETURNING *;
      `, [id])
      res.json(deleteUser.rows);
    } catch (err){
      console.error(err.message);
    }
  });

  // -------------------- LOGIN -------------------

  const getUserWithName = function(name) {
    return db.query(`
    SELECT * FROM users
    where username = $1`
    , [name])
      .then(res => res.rows[0]);
  };

  const login =  function(name, password) {
    return getUserWithName(name)
      .then(user => {
        if (user) {
          // if (bcrypt.compareSync(password, user.password)) {
          if (password === user.password) {
            return user;
          }
        }
        return null;
      });
  };

  router.post('/login', (req, res) => {
    const {username, password} = req.body;
    login(username, password)
      .then(user => {
        if (!user) {
          res.status(401).send("Invalid Email/Password");
          // res.send({error: "error"});
          return;
        }
        const token = jwt.sign({ userId:user.id}, 'shhhhh');
        res.json({user: {username: user.username, email: user.email, id: user.id},
          token
        });
      })
      .catch(e => res.send(e));
  });

  // ----------------- ME ----------------

  router.get('/me', async (req, res) => {
    console.log(req.headers)
    const decoded = jwt.verify(req.headers.authorization, 'shhhhh');
    console.log(decoded, "decoded");
    const userId = decoded.userId
    
    if (!userId) {
      res.status(404).send({error: "not logged in"});
      return;
    }

    try {
      const user = await db.query(
        `SELECT * FROM users
         WHERE id = $1`,
         [userId])
         res.send({user: {name: user.name, email: user.email, id: userId}});  
    } catch (err) {
      res.send(e);
      
    }
  });



  return router;
}
