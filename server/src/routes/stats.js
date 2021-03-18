const router = require("express").Router();
const { 
  totalWins, 
  totalLosses,
  totalMatches,
  totalActions,
  winsAsWhite,
  winsAsBlack,
  avgMatchLength 
} = require("../db_helpers/db_stats_helpers")

module.exports = db => {


  // 1. W/L 60/20
  // 2. percent win white
  // 3. percent win black
  // 4. average num moves
  // 5. average match length
  
  router.get("/stats/:id", async (req, res) => {
    const userId = req.params.id
    try {
      const wins = await totalWins(userId);
      const losses = await totalLosses(userId);
      const totalMatches = await totalMatches(userId);
      const totalActions = await totalActions(userId);
      const winsAsWhite = await winsAsWhite(userId);
      const winsAsBlack = await winsAsBlack(userId);
      const avgMatchLength = await avgMatchLength(userId);

      res.json({
        wins, 
        losses, 
        totalMatches,
        totalActions,
        winsAsWhite,
        winsAsBlack,
        avgMatchLength
      })

    } catch (err) {

    }

  })

  return router;
}

/* 1. 
SELECT wins as count(winner)
FROM matches 
WHERE winner = user_id

SELECT losses as count(loser)
FROM matches 
WHERE loser = user_id
*/

/* 4.
SELECT count(id) 
FROM matches
WHERE user1_id = 1 OR user2_id = 1

SELECT count(id) FROM action_logs 
WHERE user_id = 1;

SELECT matches.id, count(action_logs.id) as avg_actions, count(matches.id) as tot_matches
FROM action_logs
JOIN matches ON action_logs.match_id = matches.id
WHERE matches.user1_id = 1 OR matches.user2_id = 1 AND action_logs.user_id = 1
GROUP BY matches.id;
*/



/*
  SELECT action_logs.id as actionId, matches.id as matchid
  FROM action_logs JOIN matches
  ON action_logs.match_id = matches.id
  WHERE matches.user1_id = 1 OR matches.user2_id = 1 AND action_logs.user_id = 1 AND action_logs.user_id != null;

2. 
  SELECT COUNT(*) AS win_white
  FROM matches 
  WHERE winner = 1 AND white = 1;

  
3. 
  SELECT COUNT(*) AS win_black
  FROM matches
  WHERE winner = 1 AND black = 1;
  
5.
  SELECT AVG(end_time-start_time) AS avg_match_len
  FROM matches
  WHERE user1_id = 1 OR user2_id = 1;
*/