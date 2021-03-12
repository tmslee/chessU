const router = require("express").Router();

module.exports = db => {
  router.get('/chatLogs/:matchID', async (req, res) => {
    const matchID = req.params.matchID;
    try {
      const chatLog = await db.query(
      `SELECT * FROM chat_logs
       WHERE match_id = $1`, [matchID]
        );
      res.json(chatLog.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  router.post('/chatLogs', async (req, res) => {
    const { userID, matchID, action } = req.params
    try {
      const allChatLogs = await db.query(
        `INSERT INTO chat_logs (user_id, match_id, message) VALUES (
          $1, $2, $3
        ) RETURNING*`, [userID, matchID, message]
      );
      res.json(allChatLogs.rows)
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