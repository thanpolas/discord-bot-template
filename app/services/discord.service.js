/**
 * @fileoverview Service that provides connectivity and authentication to the
 *  discord-commando API.
 */

const config = require('config');
const Discord = require('discord.js');

const log = require('./log.service').get();

const discordService = (module.exports = {});

/**
 * @type {?Discord} Discord client
 * @private
 */
discordService._client = null;

/**
 * Returns the Discord Command instance.
 *
 * @return {Discord} Discord client.
 * @throws {Error} when discord is disconnected.
 */
discordService.getClient = () => {
  if (!discordService._client) {
    throw new Error(
      'Discord Service not initialized yet - client does not exist',
    );
  }

  return discordService._client;
};

/**
 * Checks if service is connected to Discord.
 *
 * @return {boolean}
 */
discordService.isConnected = () => {
  return !!discordService._client;
};

/**
 * Initialize and connect to the Discord API.
 *
 * @param {Object} bootOpts A set of app-boot options, docs in app index.
 * @return {Promise<void>} A Promise.
 */
discordService.init = async function (bootOpts) {
  if (bootOpts.testing) {
    return;
  }
  return new Promise((resolve, reject) => {
    log.notice('Starting Discord Service...');

    const client = (discordService._client = new Discord.Client());

    client.on('ready', () => {
      log.notice(`Discord Connected as: ${client.user.tag}`);

      resolve();
    });

    client.on('error', async (error) => {
      await log.warn(`Discord Client Error. Connected at: ${client.readyAt}`, {
        error,
      });

      // When no connection has been established, the service is still in
      // initialization mode
      if (!client.readyAt) {
        reject();
      }
    });

    client.login(config.discord.token);
  });
};

/**
 * Disposes discord service.
 *
 * @return {Promise<void>}
 */
discordService.dispose = async () => {
  if (!discordService.isConnected()) {
    return;
  }
  await discordService._client.destroy();
};
