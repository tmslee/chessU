const router = require("express").Router();
const jwt = require('jsonwebtoken');
const {
  allUsers,
  addUser,
  editUser,
  deleteUser,
  getUserWithId,
  getUserWithName
} = require('../db_helpers/db_user_helpers');

module.exports = db => {
  router.get('/users', (req, res) => {
    allUsers()
    .then( users => {
      res.json(users);
    })
    .catch( err => {
      res.send(err);
    })
  });

  router.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    getUserWithId(userId)
    .then( user => {
      res.json(user);
    })
    .catch( err => {
      res.send(err);
    })
  });

  router.post('/users', (req, res) => {
    const {username, email, password} = req.body;

    addUser(username, email, password)
    .then( user => {
      const token = jwt.sign({ userId:user.id}, 'shhhhh');
      res.json({user: {username: user.username, email: user.email, id: user.id},
        token
      });
    })
    .catch( err => {
      res.send(err);
    })
  })

  
  router.put('/users/:id', async (req, res) => {
    const {username, email, password} = req.body;
    const userId = req.params.id;

    editUser(username, email, password, userId)
    .then( user => {
      res.json(user);
    })
    .catch( err => {
      res.send(err);
    })
  });

  router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    deleteUser(userId)
    .then( user => {
      res.json(user);
    })
    .catch( err => {
      res.send(err);
    })
  });

  // -------------------- LOGIN -------------------

  const login =  function(name, password) {
    return getUserWithName(name)
      .then(user => {
        if (user) {
          // if (bcrypt.compareSync(password, user.password)) {
          if (password === user.password) {
            return user;
          }
        }
        return null;
      });
  };

  router.post('/login', (req, res) => {
    const {username, password} = req.body;
    login(username, password)
      .then(user => {
        if (!user) {
          res.status(401).send("Invalid Email/Password");
          // res.send({error: "error"});
          return;
        }
        const token = jwt.sign({ userId:user.id}, 'shhhhh');
        res.json({user: {username: user.username, email: user.email, id: user.id},
          token
        });
      })
      .catch(e => res.send(e));
  });

  // ----------------- ME ----------------

  router.get('/me', async (req, res) => {
    const decoded = jwt.verify(req.headers.authorization, 'shhhhh');
    const userId = decoded.userId;
    getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }
        res.json(user); 
      })
      .catch(e => res.send(e));
  });
  return router;
}
