/**
 * @fileoverview Bootsrap for Entities.
 */

const discordEnt = require('./discord');
const discordRouter = require('./discord-router');
const { init: initAdminRelay } = require('./admin-logs');

const bootstrap = (module.exports = {});

/**
 * Bootstrap for Entities.
 *
 * @param {Object} bootOpts Application boot options.
 * @param {boolean} bootOpts.testing When true go into testing mode.
 * @return {Promise} a promise.
 */
bootstrap.init = async (bootOpts) => {
  if (bootOpts.testing) {
    return;
  }

  await discordEnt.init(bootOpts);
  await discordRouter.init();
  await initAdminRelay.init();
};

/**
 * Dispose of all needed services for a gracefull shutdown.
 *
 * @return {Promise<void>}
 */
bootstrap.dispose = async () => {
  discordEnt.dispose();
};
