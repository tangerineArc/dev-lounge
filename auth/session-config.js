import connectPgSimple from "connect-pg-simple";
import session from "express-session";

import pool from "../db/pool.js";

const pgSession = connectPgSimple(session);

const sessionStore = new pgSession({
  pool: pool,
  tableName: "user_sessions",
  createTableIfMissing: true,
});

const sessionObject = session({
  store: sessionStore,
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 days
});

export default sessionObject;
