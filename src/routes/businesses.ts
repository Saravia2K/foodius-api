import { Router } from "express";
import BusinessesController from "../controllers/BusinessesController";

const router = Router();

router.get("/", BusinessesController.GetBusiness);

router.get("/:slug", BusinessesController.GetInfo);

router.get("/:id/dashboard", BusinessesController.GetInfoForDashboard);

export default router;
