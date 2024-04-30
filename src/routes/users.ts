import { Router } from "express";
import UsersController from "../controllers/UsersController";

const router = Router();

router.post("/sign-up", UsersController.SignUp);

router.post("/login", UsersController.Login);

export default router;
