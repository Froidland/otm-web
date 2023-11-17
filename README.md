# About this repository

This repository holds the code to the authentication server for [this project](https://github.com/Froidland/otm-bot).

# Requirements

In order to run the server, you need to have installed:

```
pnpm v8.9.2 or higher (earlier versions might work)
node v20.8.1 or higher (same as above)
```

Once you have them installed, you can run the following command to install the dependencies and generate the database client:

```
pnpm install
npx prisma generate
```

## Environment variables

In this repository you can find a file called `.env.example`. You need to create a file called `.env` and copy the contents of the example file into it. Then, you need to fill the values with the correct ones. In the comments of the example file you can find the urls to get the values.

### Getting the osu! credentials

For the osu! related variables, you can follow the same instructions as in the [bot repository](https://github.com/Froidland/otm-bot). The only difference is that you will need to add a redirect url to the OAuth2 section of the application.

The redirect URL should be `https://{YOUR_DOMAIN}/api/auth/login/osu/callback`, if you are running the server locally in development mode, you can use `http://localhost:5173/api/auth/login/osu/callback`, this will be the value for `VITE_OSU_REDIRECT_URI`. In the same page, you will find the client id and client secret, these will be the values for `VITE_OSU_CLIENT_ID` and `VITE_OSU_CLIENT_SECRET`.

### Getting the Discord credentials

The instructions for the Discord differ a little from the bot project, in order to run the OAuth flow, you will need to create an application in the [Discord Developer Portal](https://discord.com/developers/applications). If you are coming from the bot repository, you can use the same application you used for it, but you will need to add a redirect url to the OAuth2 section of the application just like you did with the osu! application.

The redirect URL should be `https://{YOUR_DOMAIN}/api/auth/login/discord/callback`, if you are running the server locally in development mode, you can use `http://localhost:5173/api/auth/login/discord/callback`, this will be the value for `VITE_DISCORD_REDIRECT_URI`. In the same page, you will find the client id and client secret, these will be the values for `VITE_DISCORD_CLIENT_ID` and `VITE_DISCORD_CLIENT_SECRET`.

### What about the database?

This project is meant to use the same database as the bot, so you will have to use the same database url as the bot. The migrations are already included in the repository, so you don't need to worry about that. Any edits to the schema in the bot repository will also be comitted here, so you don't need to worry about that either.

# Running the server

Once you have everything set up, you can run the following command to build the bundle:

```
pnmp build
```

After this, you will see a `build` folder in the root of the repository, this is the folder that you will need to deploy to your server. This is not a static site, so you will need to run the server with the following command:

```
node --env-file .env build/
```

By deafault, the server will run on port 3000, on Linux you can change this by setting the `PORT` environment variable like this:

```
PORT=4000 node --env-file .env build/
```

## Development mode

If you wish to run the server in development mode, you can simply run the following command:

```
pnpm dev
```

This will start the server on port 5173 and will use Vite's hot module replacement to update the server on file changes.
