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
      console.log(newMatch.rows);
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
    const {white, black, winner, loser} = req.body;
    const matchID = req.params.matchID;
    console.log(white, black, winner, loser, matchID);
    try {
      const updatedMatch = await db.query(`
        UPDATE matches SET 
          white = $1::integer, 
          black = $2::integer,  
          winner = $3::integer,
          loser = $4::integer
        WHERE id = $5::integer
        RETURNING *;`,
        [Number(white), Number(black), Number(winner), Number(loser), Number(matchID)]);
      res.json(updatedMatch.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  return router;
}