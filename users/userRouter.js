const express = require('express');
const router = express.Router();
const postRouter = require('../posts/postRouter');
const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
    const user = req.body;
    Users.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const { body } = req;
    Posts.insert(body)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
});

router.get('/', (req, res) => {
    Users.get(req.query)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
});

router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    Users.getById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const { id } = req.params;
    Users.getUserPosts(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
});

router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    Users.remove(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
});

router.put('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    const { body } = req;
    Users.update(id, body)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    Users.getById(id)
        .then(user => {
          if (user) {
            req.user = user
            next()
          } else {
            res.status(400).json({ message: 'Invalid user id'})
          }
        })
        .catch(err => {
          console.log(`Error: ${err}`)
        });
}

function validateUser(req, res, next) {
    if (!req.body) {
      return res.status(400).json({ message: "Missing user data"})
    } else if (!req.body.name) {
      return res.status(400).json({ message: "Missing required text field"})
    } else {
      next()
    }
}

function validatePost(req, res, next) {
    if(!req.body) {
      return res.status(400).json({ message: "Missing post data"})
    } else if(!req.body.text) {
      return res.status(400).json({ message: "Missing required text field"})
    } else {
      next();
    }
}

module.exports = router;
