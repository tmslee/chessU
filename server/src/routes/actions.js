const router = require("express").Router();

module.exports = db => {
  router.get('/actions/:matchID', async (req, res) => {
    const matchID = req.params.matchID;
    try {
      const actions = await db.query(
      `SELECT * FROM action_logs
       WHERE match_id = $1`, [matchID]
        );
      res.json(actions.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  router.post('/actions', async (req, res) => {
    const { userID, matchID, action } = req.params
    try {
      const allActions = await db.query(
        `INSERT INTO action_logs (user_id, match_id, action) VALUES (
          $1, $2, $3
        ) RETURNING*`, [userID, matchID, action]
      );
      res.json(allActions.rows)
    } catch (err) {
      console.error(err.message);
    }
  })

  // router.put('/users/:id', async (req, res) => {
  //   const {id, name} = req.body.user;
  //   db.query(
  //     `INSERT INTO users (name) VALUES ($1);`, [name]
  //   ).then(() => res.status(204).json({}))
  // })

  return router;
}