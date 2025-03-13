#! /usr/bin/env node

"use strict";

import "dotenv/config";
import pg from "pg";

const SQL = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
    create TYPE status AS ENUM ('commoner', 'knight', 'elite');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS member (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ) UNIQUE NOT NULL,
  password_hash VARCHAR ( 255 ) NOT NULL,
  first_name VARCHAR ( 255 ) NOT NULL,
  last_name VARCHAR ( 255 ) NOT NULL,
  membership_status STATUS DEFAULT 'commoner'
);

CREATE TABLE IF NOT EXISTS post (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  userId INTEGER,
  FOREIGN KEY ( userId ) REFERENCES member ( id )
);
`;

async function main() {
  console.log("schema creation started ...");

  const client = new pg.Client({
    connectionString: process.env.DB_CONNECTION_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("... schema created successfully");
}

main();
