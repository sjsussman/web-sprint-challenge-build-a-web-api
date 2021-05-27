const express = require('express');

const projectsRouter = require('./routes/projectsRouter')
const actionsRouter = require('./routes/actionsRouter')

const server = express();

server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.use('/', (req, res) => {
  res.send(`<h2>Successful load!</h2>`);
});

module.exports = server;
