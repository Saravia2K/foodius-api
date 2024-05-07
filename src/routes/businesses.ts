import { Router } from "express";
import BusinessesController from "../controllers/BusinessesController";

const router = Router();

router.get("/", BusinessesController.GetBusiness);

router.get("/:id", BusinessesController.GetInfo);


export default router;
