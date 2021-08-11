/**
 * @fileoverview Bootsrap for Entities.
 */

const discordEnt = require('./discord');
const messageRouter = require('./message-router');

const bootstrap = (module.exports = {});

/**
 * Bootstrap for Entities.
 */
bootstrap.init = async () => {
  await messageRouter.init();
  await discordEnt.init();
};
