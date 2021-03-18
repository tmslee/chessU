const router = require("express").Router();
const { 
  ranked30
} = require("../db_helpers/db_leaderboard_helpers")

module.exports = db => {
  router.get('/leaderboards/:type', (req, res) => {
    const type = req.params.type;

    if (type === 'ranked30') {
      ranked30()
      .then( users => {
        res.json(users)
      })
      .catch( err => res.json(err))
    } 
  })


  return router;
}

 // I NEED TO GRAB user object of { profile_img, username, elo, isFriend }

 

