/**
 * @fileoverview Core testing library, must be included by all tests.
 */

const logger = require('../../app/services/log.service');

// Initialize logger early.
logger.init({
  appName: 'skgbot-test',
  suppressLogging: false,
});

const log = logger.get();

// Set proper node environment
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

// Setup unhandled promise rejection handler, helps during low-level
// testing.
process.on('unhandledRejection', (error) => {
  log.error('TEST :: Unhandled Promise Rejection', { error });
});

const testLib = (module.exports = {});

const app = require('../..');

/**
 * Core testing library, must be included by all tests.
 *
 */
testLib.init = () => {
  beforeAll(async () => {
    await app.init({ testing: true });
  });

  // Cleanly exit
  afterAll(async () => {
    await app.dispose();
  });
};
