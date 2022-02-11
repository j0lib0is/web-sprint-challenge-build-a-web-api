// Import
const express = require('express');
// Server
const server = express();
server.use(express.json());
// Routers
const actionsRouter = require('./actions/actions-router');
server.use('/api/actions', actionsRouter);
const projectsRouter = require('./projects/projects-router');
server.use('/api/projects', projectsRouter);
// Export
module.exports = server;
