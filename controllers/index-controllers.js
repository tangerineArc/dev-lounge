import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import passport from "passport";

import * as db from "../db/queries.js";

import validateUser from "../validators/user-validator.js";

const renderHomePage = (req, res) => {
  res.render("index.ejs");
};

const renderRegisterPage = (req, res) => {
  res.render("register.ejs");
};

const renderLoginPage = (req, res) => {
  res.render("login.ejs");
};

const renderConfidentialPage = (req, res) => {
  res.render("confidential.ejs", { isAuthenticated: req.isAuthenticated() });
};

const renderLoginSuccessPage = (req, res) => {
  res.render("login-success.ejs");
};

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/protected-route");
  });
};

const registerNewUser = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(
        errors
          .array()
          .map((err) => err.msg)
          .join(" :: ")
      );
    }

    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_LENGTH)
    );

    await db.saveUser({ username, passwordHash });

    res.redirect("/");
  }),
];

const loginUser = passport.authenticate("local", {
  failureRedirect: "/login-failure",
  successRedirect: "/login-success",
});

export {
  loginUser,
  logoutUser,
  registerNewUser,
  renderConfidentialPage,
  renderHomePage,
  renderLoginPage,
  renderLoginSuccessPage,
  renderRegisterPage,
};
