const router = require("express").Router();

module.exports = db => {
  router.get('/matches', async (req, res) => {
    try {
      const allMatches = await db.query(`SELECT * FROM matches;`);
      res.json(allMatches.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.post('/matches', async (req, res) => {
    const {type, user1ID, user2ID} = req.body;
    try {
      const newMatch = await db.query(
        `INSERT INTO matches (type, user1_id, user2_id) VALUES (
          $1::text, $2::integer, $3::integer
        ) RETURNING *;`,
        [type, user1ID, user2ID]);
      res.json(newMatch.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.get('/matches/:matchID', async (req, res) => {
    const matchID = req.params.matchID;
    try {
      const match = await db.query(`SELECT * FROM matches where id = $1;`, [matchID]);
      res.json(match.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.put('/matches/:matchID', async (req, res) => {
    const {type, user1ID, user2ID, winner, loser} = req.body;
    const matchID = req.params.matchID;
    try {
      const updatedMatch = await db.query(`
        UPDATE matches SET 
          type = $1::text,
          user1_id = $2::integer, 
          user2_id = $3::integer,  
          winner = $4::integer,
          loser = $5::integer
        WHERE id = $6::integer
        RETURNING *;`,
        [type, user1ID, user2ID, winner, loser, matchID]);
      res.json(updatedMatch.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  return router;
}