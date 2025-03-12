import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerNewUser,
  renderConfidentialPage,
  renderHomePage,
  renderLoginPage,
  renderLoginSuccessPage,
  renderRegisterPage,
} from "../controllers/index-controllers.js";

const indexRouter = Router();

indexRouter.get("/", renderHomePage);

indexRouter.get("/login", renderLoginPage);
indexRouter.post("/login", loginUser);

indexRouter.get("/register", renderRegisterPage);
indexRouter.post("/register", registerNewUser);

indexRouter.get("/protected-route", renderConfidentialPage);

indexRouter.get("/logout", logoutUser);
indexRouter.get("/login-success", renderLoginSuccessPage);

indexRouter.get("/login-failure", (req, res) => {
  res.send("Credentials do not match");
});

export default indexRouter;
