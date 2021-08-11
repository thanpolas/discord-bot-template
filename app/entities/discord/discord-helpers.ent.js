/**
 * @fileoverview Various discord helpers, queries and methods.
 */

const { getClient } = require('../../services/discord.service');

const {
  getGuild,
  getGuildChannel,
  getGuildMemberUid,
} = require('./logic/guild.ent');
const { loggerToAdmin } = require('./logic/relay-to-admin.ent');
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
entity.loggerToAdmin = loggerToAdmin;
entity.sendMessageToChannels = sendMessageToChannels;
entity.getAddressLink = getAddressLink;
entity.getTokenLink = getTokenLink;
entity.removeCommand = removeCommand;

/**
 * Execute any available one off discord tasks...
 *
 * @return {Promise<void>} A Promise.
 */
entity.init = async () => {
  getClient().on('guildCreate', guildJoined);
};
