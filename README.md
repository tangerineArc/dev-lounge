# DevLounge

DevLounge (intended for developers) is an anonymous posting platform for members only. Think of it like an exclusive speakeasy for your thoughts. Only members can see who said what, while outsiders just get the juicy gossip without the receipts.

## Features

- Users can sign up but must enter a secret passcode to become a member.
- Anonymous posting where non-members can read stories, but only members can see who posted them
- Members can create titled posts with timestamps and content
- Only admin users can delete posts because they are the _elites_ :)

## Tech Stack

- **JavaScript** - programming language
- **Node** - JavaScript server-side runtime
- **Express** - backend server framework
- **PostgreSQL** - SQL database engine
- **Passport** - auth strategy provider
- **bcrypt** - hash and compare passwords
- **Express Validator** - data validation library
- **Node-Postgres** - database connector library
- **EJS** - templating engine
- **CSS** - UI styling

## Repo Structure

Below is a list of the project directories and files:

- `auth/` - contains config files for auth
  - `session-config.js` - psql session storage config
  - `strategy.js` - passport local-strategy set up
  - `transformers.js` - cookie serializer and deserializer
- `controllers/` - contains auth- and posts-controllers
- `db/`
  - `pool.js` - database connector instantiation
  - `queries.js` - required SQL queries
- `middlewares/`
  - `authenticators.js` - authorization middlewares
  - `prevent-back.js` - cache and navigation control middlewares
- `public/styles/` - contains CSS files
- `routes/` - contains auth- and posts-routers
- `utils/format-data.js` - date and time formatters
- `validators/` - contains data validation middlewares
- `views/` - contains EJS page templates
- `app.js` - server setup and entrypoint
- `schema.js` - executable script for database schema creation
- `seeds.js` - executable script for seeding database

## Snapshots

![dev-lounge-1.png](https://i.postimg.cc/NMHxRfj7/dev-lounge-1.png)
| ![dev-lounge-2.png](https://i.postimg.cc/zGzp4rx8/dev-lounge-2.png) | ![dev-lounge-3.png](https://i.postimg.cc/CKtNZfSx/dev-lounge-3.png) |
| --- | --- |
