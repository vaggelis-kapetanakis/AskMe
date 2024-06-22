import { Router } from "express";
import { check } from "express-validator";
import checkAuth from "../middleware/check-auth";
import usersController from "../controllers/user-controller";

const router = Router();

router.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail(),
    check("username").not().isEmpty(),
    check("password").isLength({ min: 8 }),
  ],
  usersController.signup
);

router.patch("/login", usersController.login);

router.post("/logout", usersController.logout);

router.post("/updateuser", checkAuth, usersController.updateUserCredentials);

export default router;
