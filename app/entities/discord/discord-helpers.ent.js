/**
 * @fileoverview Various discord helpers, queries and methods.
 */

const {
  getClient,
  init: initService,
  dispose: disposeService,
} = require('./discord.service');

const {
  getGuild,
  getGuildChannel,
  getGuildMemberUid,
} = require('./logic/guild.ent');

const { guildJoined } = require('./logic/guild-join.ent');
const {
  getMainChannel,
  sendMessageToChannels,
} = require('./logic/channels.ent');
const {
  getAddressLink,
  getTokenLink,
  removeCommand,
} = require('./logic/discord-helpers.ent');

const entity = (module.exports = {});

entity.getMainChannel = getMainChannel;
entity.getGuild = getGuild;
entity.getGuildChannel = getGuildChannel;
entity.getGuildMemberUid = getGuildMemberUid;
entity.sendMessageToChannels = sendMessageToChannels;
entity.getAddressLink = getAddressLink;
entity.getTokenLink = getTokenLink;
entity.removeCommand = removeCommand;

/**
 * Execute any available one-off discord tasks...
 *
 * @param {Object} bootOpts Application boot options.
 * @param {boolean} bootOpts.testing When true go into testing mode.
 * @return {Promise<void>} A Promise.
 */
entity.init = async (bootOpts) => {
  getClient().on('guildCreate', guildJoined);
  initService(bootOpts);
};

/**
 * Dispose of all needed services for a gracefull shutdown.
 *
 * @return {Promise<void>}
 */
entity.dispose = async () => {
  await disposeService();
};
