const router = require("express").Router();
const { 
  ranked30, 
  ranked10,
  ranked0
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
    } else if (type === 'ranked10') {
      ranked10()
      .then( users => {
        res.json(users)
      })
    } else if (type === 'ranked0') {
      ranked0()
      .then( users => {
        res.json(users)
      })
    }
  })


  return router;
}

 // I NEED TO GRAB user object of { profile_img, username, elo, isFriend }

 

