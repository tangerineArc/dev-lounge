import { body } from "express-validator";

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username cannot be empty"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be a minimum of 8 characters"),
];

export default validateUser;
