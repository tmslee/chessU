const router = require("express").Router();

module.exports = db => {

  router.get('/queues/:gameType', async (req, res) => {
    const gameType = req.params.gameType;
    try{
      const queue = await db.query(`
        SELECT * FROM queues 
        WHERE game_type = $1::text ;
      `, [gameType])
      res.json(queue.rows);
    } catch (err){
      console.error(err.message);
    }
  });

  router.get('/queues', async (req, res) => {
    try{
      const queues = await db.query(`
        SELECT * FROM queues 
        `)
      res.json(queues.rows);
    } catch (err){
      console.error(err.message);
    }
  });
 
  router.post('/queues', async (req, res) => {
    //body contains userId and game Type 
    //
    const { currentUserID, type, username, elo } = req.body;
    try {
      const newQueue = await db.query(
        `INSERT INTO queues (user_id, username, elo, game_type) 
        VALUES($1, $2, $3, $4) RETURNING *;`,
        [currentUserID, username, elo, type])
      res.json(newQueue.rows)
    } catch (err) {
        console.error(err.message);
    }
  });

  router.delete('/queues/:userID', async (req, res) => {
    const userID = req.params.userID;
    try{
      const deleteUser = await db.query(`
        DELETE FROM queues 
        WHERE user_id = $1::integer
        RETURNING *;
      `, [userID])
      res.json(deleteUser.rows);
    } catch (err){
      console.error(err.message);
    }
  })


  return router;
}