/**
 * @fileoverview Various discord helpers, queries and methods.
 */

const {
  getGuild,
  getGuildMember,
  getGuildMemberLocal,
  getGuildMemberUid,
  getOnboardingMembers,
  getGuildChannel,
  getGuildMembers,
} = require('./logic/guild.ent');
const { getMainChannel } = require('./logic/channels.ent');

const entity = (module.exports = {});

entity.getMainChannel = getMainChannel;
entity.getGuild = getGuild;
entity.getGuildMember = getGuildMember;
entity.getGuildMemberLocal = getGuildMemberLocal;
entity.getGuildMemberUid = getGuildMemberUid;
entity.getGuildChannel = getGuildChannel;
entity.getOnboardingMembers = getOnboardingMembers;
entity.getGuildMembers = getGuildMembers;

/**
 * Execute any available one off discord tasks...
 *
 * @return {Promise<void>} A Promise.
 */
entity.init = async () => {};
