import { body } from "express-validator";

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      "Title must be at least 3 characters and at most 255 characters long"
    ),
  body("description")
    .trim()
    .isLength({ min: 50 })
    .withMessage("Description must be at least 50 characters long"),
];

export default validatePost;
