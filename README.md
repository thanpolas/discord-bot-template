# SKGTech Discord Bot

> Enables onboarding of new users, moderation and provides useful commands to users.

# How To Install

We use Docker and docker-compose, so you will need to install
the [Docker Desktop][docker-desktop] package
on your local machine.

Once that is done, enter the working directory and type:

```
docker-compose up
```

[More on all `docker-compose` available commands][docker-compose].

## Needed Environment Variables

All targets require the following environment variables:

-   `POSTGRES_URL` A url with credentials pointing to the data store.
-   `DISCORD_GUILD_ID` The guild id of your server.
-   `DISCORD_BOT_TOKEN` The Discord token of the bot.
-   `DISCORD_COMMANDO_UID` Your user id, so you can invoke discord commands.
-   `DISCORD_ADMIN_CHANNEL_ID` Channel ID to relay messages to.
-   `DISCORD_MODERATOR_ROLE_ID` The role id of the moderator role.
-   `DISCORD_MEMBER_ROLE_ID` The id of the main ("member") role.
-   `DISCORD_MAIN_CHANNEL_ID` The id of the main chatter channel, for welcome
        messages.
-   `SKGBOT_EMAIL_AUTH_PASSWORD` The SMTP password for sending emails.
-   `SKGBOT_OPTIONS_TIMEZONE` Set the timezone on which the task manager (cron)
    will run on. Use values from [Moment Timezone](https://momentjs.com/timezone).

This project also supports a [`.env` file][dotenv] which is on `.gitignore`
for your convenience when developing on your local.

# Development Operations / Maintenance

## Reset Local Database

```
npm run db:reset:local
```

## Database Migration Commands

### Create a New Migration Script

```
npm run knex:create_migration <name of migration>
```

### Run Migrations

```
npm run knex:migrate
```

## Running Tests Locally

Use the `jest` command to run all tests or specific ones.

### Reset Test Database

The tests will look for the `NUKE_TEST_DB` environment variable to be set to
initiate the test database nuking and re-population, use it like so:

```bash
NUKE_TEST_DB=1 jest
```

## Update Node Version

When a new node version is available you need to updated it in the following:

-   `/package.json`
-   `/.nvmrc`
-   `/.circleci/config.yml`
-   `/Dockerfile`

# Deployment

TBD

## License

Copyright © SKGTech and Authors, Licensed under ISC.

[docker-compose]: https://docs.docker.com/compose/reference/overview/
[docker-desktop]: https://www.docker.com/products/docker-desktop
[dotenv]: https://github.com/motdotla/dotenv#readme
