/**
 * @fileoverview Service that provides connectivity and authentication to the
 *  discord API.
 */

const config = require('config');
const { Client, Intents } = require('discord.js');

const log = require('../../services/log.service').get();

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
  return !!discordService?._client;
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

  if (config.discord.token.indexOf('DO NOT SET') !== -1) {
    await log.warn('Discord token not set. Will boot without discord');
    return;
  }

  await log.notice('Starting Discord Service...');

  const client = (discordService._client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
    partials: ['CHANNEL'],
  }));

  const promise = new Promise((resolve, reject) => {
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
  });

  promise.catch(async (ex) => {
    await log.warn(`Discord service not initialized. Error: ${ex.message}`);
  });

  try {
    await client.login(config.discord.token);
  } catch (ex) {
    await log.warn(`Discord login failed Error: ${ex.message}`);
  }

  return promise;
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
