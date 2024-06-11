import { Router } from "express";
import IndexController from "../controllers/IndexController";

const router = Router();

router.post("/check-login", IndexController.checkLogin);

router.get("/", IndexController.index);

export default router;
