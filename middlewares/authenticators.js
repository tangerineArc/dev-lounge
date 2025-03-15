import asyncHandler from "express-async-handler";

import * as db from "../db/queries.js";

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/sign-in");
}

const checkCommonerStatus = (req, res, next) => {
  if (req.user.membership_status === "commoner") {
    return next();
  }

  res.redirect("/");
}

const checkPostCreationAbility = (req, res, next) => {
  if (req.user.membership_status !== "commoner") {
    return next();
  }

  res.redirect("/posts");
}

const checkPostDeletionAbility = asyncHandler(async (req, res, next) => {
  if (req.user.membership_status === "elite") {
    return next();
  }

  if (req.user.membership_status === "commoner") {
    return res.redirect("/posts");
  }

  const { postId } = req.params;
  const verified = await db.verifyPostAndMember(postId, req.user.id);

  if (verified) {
    return next();
  }

  res.redirect("/posts");
});

export {
  checkAuthentication,
  checkCommonerStatus,
  checkPostCreationAbility,
  checkPostDeletionAbility,
};
