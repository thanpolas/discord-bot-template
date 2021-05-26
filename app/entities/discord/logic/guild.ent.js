/**
 * @fileoverview Guild related methods.
 */

const config = require('config');

const { getClient } = require('../../../services/discord.service');

const entity = (module.exports = {});

/**
 * Gets the guildmember instance from a discord message instance.
 *
 * @param {DiscordMessage} message A discord member instance.
 * @return {Promise<DiscordGuildMember>} Returns the guildmember instance.
 */
entity.getGuildMember = async (message) => {
  return entity.getGuildMemberUid(message.author.id);
};

/**
 * Gets the guildmember instance from a localMember record.
 *
 * @param {Member} localMember A local member record.
 * @return {Promise<DiscordGuildMember>} Returns the guildmember instance.
 */
entity.getGuildMemberLocal = async (localMember) => {
  return entity.getGuildMemberUid(localMember.discord_uid);
};

/**
 * Gets the guildmember instance from a discord member id.
 *
 * @param {DiscordMemberId} discordMemberId Discord member id.
 * @return {Promise<DiscordGuildMember|null>} Returns the guildmember instance
 *    or null if member does not exist in the guild.
 */
entity.getGuildMemberUid = async (discordMemberId) => {
  try {
    const guildMember = await getClient()
      .guilds.cache.get(config.discord.guild_id)
      .members.fetch(discordMemberId);

    return guildMember;
  } catch (ex) {
    return null;
  }
};

/**
 * Gets the Guild Object the bot is responsible for.
 *
 * @return {Promise<DiscordGuild>} Returns the guild instance.
 */
entity.getGuild = async () => {
  const guild = await getClient().guilds.cache.get(config.discord.guild_id);

  return guild;
};

/**
 * Fetches the Guild Channel instance based on the provided channel id.
 *
 * @param {string} channelId The channel id to be fetched.
 * @return {Promise<DiscordGuildChannel>}
 */
entity.getGuildChannel = async (channelId) => {
  const guild = await entity.getGuild();
  const guildChannel = guild.channels.cache.get(channelId);

  return guildChannel;
};

/**
 * Fetches and returns all members of the guild.
 *
 * @return {Promise<Array<GuildMember>>} Promise with all the members.
 */
entity.getGuildMembers = async () => {
  const guild = await entity.getGuild();
  const members = await guild.members.fetch();
  return members;
};

/**
 * Fetches all the onboarding members. To filter for that, we check the members'
 * roles to only be '@everyone' without any other role.
 *
 * @return {Promise<Array<GuildMember>>} A Promise with the guild members.
 */
entity.getOnboardingMembers = async () => {
  const members = await entity.getGuildMembers();
  const onboardingMembers = members.filter((member) => {
    // If member has only one role, it can only be the '@everyone' role, so
    // no need to check for the role name.
    if (member.roles.cache.size === 1) {
      return true;
    }
    return false;
  });
  return onboardingMembers;
};

/**
 * Fetches all the onboarded (joined) members. To filter for that, we check
 * the members roles, if they have the "member" role, they pass.
 *
 * @return {Promise<Array<GuildMember>>} A Promise with the guild members.
 */
entity.getJoinedMembers = async () => {
  const members = await entity.getGuildMembers();
  const joinedMembers = members.filter((member) => {
    // If member has only one role, it can only be the '@everyone' role, so
    // no need to check for the role name.
    if (member.roles.cache.has(config.discord.member_role_id)) {
      return true;
    }
    return false;
  });
  return joinedMembers;
};
