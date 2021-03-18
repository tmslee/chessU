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
      const matches = await totalMatches(userId);
      const actions = await totalActions(userId);
      const whiteWins = await winsAsWhite(userId);
      const blackWins = await winsAsBlack(userId);
      const avgMatch = await avgMatchLength(userId);

      res.json({
        wins: wins.wins,  
        losses: losses.losses, 
        matches: matches.tot_matches,
        actions: actions.tot_actions,
        whiteWins: whiteWins.win_white,
        blackWins: blackWins.win_black,
        avgMatch: avgMatch.avg_match_len
      })

    } catch (err) {
      console.error(err.message);
    }

  })

  return router;
}
