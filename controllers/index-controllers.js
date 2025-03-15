import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import passport from "passport";

import * as db from "../db/queries.js";

import formatDate from "../utils/format-date.js";

import validateMember from "../validators/member-validator.js";

const renderHomePage = (req, res) => {
  res.render("home-page.ejs");
};

const renderSignInPage = (req, res) => {
  const errorMessages = req.session.messages;
  req.session.messages = [];

  const successMessages = [];
  if (req.query["account-created"] === "1") {
    successMessages.push("Account created successfully.");
    successMessages.push("Sign in for more fun.");
  }

  res.render("form-page.ejs", {
    title: "DevLounge | Sign In",
    page: "sign-in",
    actionRoute: "/sign-in",
    errorMessages,
    successMessages,
  });
};

const renderSignUpPage = (req, res) => {
  res.render("form-page.ejs", {
    title: "DevLounge | Sign Up",
    page: "sign-up",
    actionRoute: "/sign-up",
  });
};

const renderProfilePage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const member = await db.selectMemberById(id);
  const posts = await db.selectAllPostsByUserId(id);

  let samePerson = false;
  if (Number(id) === req.user?.id) {
    samePerson = true;
  }

  res.render("profile-page.ejs", { member, posts, samePerson, formatDate });
});

const renderBecomeKnightPage = (req, res) => {
  res.render("riddle-page.ejs");
};

const signInMember = passport.authenticate("local", {
  failureRedirect: "/sign-in",
  successRedirect: "/posts",
  failureMessage: true,
});

const signOutMember = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

const signUpMember = [
  validateMember,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { username, firstName, lastName } = req.body;

      return res.render("form-page.ejs", {
        title: "DevLounge | Sign Up",
        page: "sign-up",
        actionRoute: "/sign-up",
        errorMessages: errors.array().map((err) => err.msg),
        defaults: { username, firstName, lastName },
      });
    }

    const { username, password, firstName, lastName } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    await db.insertNewMember({
      username,
      passwordHash,
      firstName,
      lastName,
    });

    res.redirect("/sign-in?account-created=1");
  }),
];

const makeMemberKnight = asyncHandler(async (req, res) => {
  const { answer } = req.body;

  if (answer.trim() === process.env.RIDDLE_ANSWER) {
    await db.updateMemberStatusToKnight(req.user.id);

    return res.redirect("/posts");
  }

  res.render("riddle-page.ejs", {
    errorMessage: "Your answer is not quite right",
  });
});

export {
  makeMemberKnight,
  renderBecomeKnightPage,
  renderHomePage,
  renderProfilePage,
  renderSignInPage,
  renderSignUpPage,
  signInMember,
  signOutMember,
  signUpMember,
};
