import { Router } from "express";

import {
  createPost,
  deletePost,
  renderPostsPage,
} from "../controllers/posts-controllers.js";

import {
  checkAuthentication,
  checkPostCreationAbility,
  checkPostDeletionAbility,
} from "../middlewares/authenticators.js";

const postsRouter = Router();

postsRouter.get("/", renderPostsPage);

postsRouter.post(
  "/create",
  checkAuthentication,
  checkPostCreationAbility,
  createPost
);

postsRouter.get(
  "/:postId/delete",
  checkAuthentication,
  checkPostDeletionAbility,
  deletePost
);

export default postsRouter;
