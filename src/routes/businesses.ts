import { Router } from "express";
import BusinessesController from "../controllers/BusinessesController";

const router = Router();

router.get("/", BusinessesController.GetBusiness);

router.get("/:slug", BusinessesController.GetInfo);

router.get("/:id/dashboard", BusinessesController.GetInfoForDashboard);

router.get("/:id/orders", BusinessesController.GetBusinessOrders);

export default router;
