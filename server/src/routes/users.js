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

  router.post('/users/:id', async (req, res) => {
    const {id, name} = req.body.user;
    db.query(
      `INSERT INTO users (name) VALUES ($1);`, [name]
    ).then(() => res.status(204).json({}))
  })

  return router;
}