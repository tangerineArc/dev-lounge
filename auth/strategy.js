import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";

import * as db from "../db/queries.js";

const verifyCallback = async (username, password, done) => {
  try {
    const member = await db.selectMemberByUsername(username);

    if (!member) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, member.password_hash);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, member);
  } catch (err) {
    return done(err);
  }
};

const localStrategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  verifyCallback
);

export default localStrategy;
