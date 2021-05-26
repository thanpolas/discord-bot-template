/**
 * @fileoverview Functions related to channels.
 */

const config = require('config');
const { getClient } = require('../../../services/discord.service');

const entity = (module.exports = {});

/**
 * @param {?Object} _mainChannel Store the reference of the main channel.
 * @private
 */
entity._mainChannel = null;

/**
 * Returns the main channel of the server, will cache it on the first invocation.
 *
 * @return {Object} The main channel of the server.
 */
entity.getMainChannel = () => {
  if (entity._mainChannel) {
    return entity._mainChannel;
  }
  const discordClient = getClient();

  entity._mainChannel = discordClient.channels.cache.get(
    config.discord.main_channel_id,
  );

  return entity._mainChannel;
};
