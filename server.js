const express = require('express');

const server = express();
// const logger = require(logger)

const postRouter = require('./posts/postRouter')

server.use('/api/posts', logger, postRouter)

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  const time = new Date();

  console.log(`${method} to ${endpoint} at ${time}`);
  next();
}

module.exports = server;
