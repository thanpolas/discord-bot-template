/**
 * @fileoverview Entity responsible for formatting and relaying select log
 *   messages to the admin channel.
 */

const config = require('config');

const { isConnected, getClient } = require('../../../services/discord.service');
const globals = require('../../../utils/globals');
const { getGuildChannel } = require('./guild.ent');

const entity = (module.exports = {});

/** @type {DiscordChannel?} Admin channel to send messages to */
entity._channel = null;

/**
 * Initialize the module by pre-fetching the admin channel to send logs to.
 *
 * @return {Promise<void>} An empty promise.
 */
entity.init = async () => {
  entity._channel = await getGuildChannel(config.discord.bot_log_channel_id);
};

/**
 * Middleware for logality, will relay select log messages to the admin channel.
 *
 * @param {Object} logContext Logality log context object.
 * @return {Promise<void>} A Promise.
 */
entity.loggerToAdmin = async (logContext) => {
  let message;
  try {
    // Don't log when not connected to discord
    if (!isConnected()) {
      return;
    }

    // don't relay when testing
    if (globals.isTest) {
      return;
    }

    // only deal with logs to relay or errors.
    if (logContext.relay || logContext.severity < 5) {
      message = entity._formatMessage(logContext);
    } else {
      return;
    }

    if (!message) {
      return;
    }

    if (typeof message !== 'string') {
      if (Array.isArray(message)) {
        message = { embeds: message };
      } else {
        message = { embeds: [message] };
      }
    }
    await entity._channel.send(message);
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error('ERROR loggerToAdmin() ::', ex);
  }
};

/**
 * Format log message to a string.
 *
 * @param {Object} lc Logality log context object.
 * @return {Promise<string>} The string message.
 * @private
 */
entity._formatMessage = async (lc) => {
  const message = [];

  if (lc.event.error) {
    // suppress occassional 403 errors from RPC
    if (lc?.event?.error?.message?.includes('bad response (status=403')) {
      return;
    }
    message.push(`:octagonal_sign: [${lc.level}] ${lc.message} :: `);
    message.push(`${lc.event.error.name} :: ${lc.event.error.message} :: `);
  }

  if (lc.emoji) {
    message.push(`${lc.emoji} [${lc.level}] ${lc.message}`);
  }

  if (lc.context && lc.context.guild) {
    const gl = lc.context.guild;
    message.push(
      `\n**Joined new guild server**:` +
        ` ${gl.guild_id} :: ${gl.guild_name} :: ${gl.description}.`,
    );
  }
  if (lc.context && lc.context.callrecord && !lc.context.callcomplete) {
    message.push(`**Created new call**:\n`);
  }

  if (lc.context && lc.context.callrecord && lc.context.callcomplete) {
    message.push(`**Making Call**:\n`);
  }

  if (lc.context && lc.context.callrecord) {
    const cr = lc.context.callrecord;
    const guild = await getClient().fetchGuildPreview(cr.discord_guild_id);
    message.push(
      `**Call Id**: ${cr.id} ::\n` +
        `**From User**: ${cr.discord_username} - ${cr.discord_uid}\n` +
        `**The call**: ${cr.call}\n` +
        `**Discord Server**: ${guild.name} - ${cr.discord_guild_id}\n` +
        `**Expires at**: ${cr.call_expires_at}`,
    );
  }

  if (lc?.context?.member_alert_record) {
    const al = lc.context.member_alert_record;
    message.push(
      `**Member**: ${al.discord_username} **Channel**:` +
        ` ${al.discord_channel_name} **Server**: ${al.discord_guild_name}` +
        ` **Pair**: ${al.token_pair} **Threshold**: ${al.diff_threshold_percent}.`,
    );
  }

  message.push(` :: ${lc.message}`);

  const messageStr = message.join('');
  return messageStr;
};
