const router = require("express").Router();

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
      res.json(individualUser.rows);
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
      res.json(newUser.rows);
    } catch (err){
      console.error(err.message);
    }
  })

  
  router.put('/users/:id', async (req, res) => {
    const {username, email, password} = req.body;
    const id = req.params.id;
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



  return router;
}
