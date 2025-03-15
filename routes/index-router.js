import { Router } from "express";

import {
  makeMemberKnight,
  renderBecomeKnightPage,
  renderHomePage,
  renderProfilePage,
  renderSignInPage,
  renderSignUpPage,
  signInMember,
  signOutMember,
  signUpMember,
} from "../controllers/index-controllers.js";

import {
  checkAuthentication,
  checkCommonerStatus,
} from "../middlewares/authenticators.js";

const indexRouter = Router();

indexRouter.get("/", renderHomePage);

indexRouter.get("/profile/:id", checkAuthentication, renderProfilePage);

indexRouter.get(
  "/become-knight",
  checkAuthentication,
  checkCommonerStatus,
  renderBecomeKnightPage
);
indexRouter.post(
  "/become-knight",
  checkAuthentication,
  checkCommonerStatus,
  makeMemberKnight
);

indexRouter.get("/sign-in", renderSignInPage);
indexRouter.post("/sign-in", signInMember);

indexRouter.get("/sign-up", renderSignUpPage);
indexRouter.post("/sign-up", signUpMember);

indexRouter.get("/sign-out", checkAuthentication, signOutMember);

export default indexRouter;
