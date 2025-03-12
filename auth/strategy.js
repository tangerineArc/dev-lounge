import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";

import * as db from "../db/queries.js";

const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.selectUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const localStrategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  verifyCallback
);

export default localStrategy;
