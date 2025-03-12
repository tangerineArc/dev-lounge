#! /usr/bin/env node

"use strict";

import "dotenv/config";
import pg from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  password_hash VARCHAR ( 255 )
);
`;

async function main() {
  console.log("dwelling started ...");

  const client = new pg.Client({
    connectionString: process.env.DB_CONNECTION_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("... dwelling finished");
}

main();
