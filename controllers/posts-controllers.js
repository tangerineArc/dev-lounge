import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import * as db from "../db/queries.js";

import formatDate from "../utils/format-date.js";

import validatePost from "../validators/post-validator.js";

const renderPostsPage = asyncHandler(async (req, res) => {
  const posts = await db.selectAllPosts();

  res.render("posts-page.ejs", { posts, formatDate });
});

const createPost = [
  validatePost,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { title, description } = req.body;
      const posts = await db.selectAllPosts();

      return res.render("posts-page.ejs", {
        posts,
        formatDate,
        errorMessages: errors.array().map((err) => err.msg),
        defaults: { title, description },
      });
    }

    const { title, description } = req.body;
    const userId = req.user.id;

    await db.insertNewPost({ title, description, userId });

    res.redirect("/posts");
  }),
];

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  await db.deletePostById(postId);

  res.redirect("/posts");
});

export { createPost, deletePost, renderPostsPage };
