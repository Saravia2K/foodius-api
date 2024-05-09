import { Router } from "express";
import OrdersController from "../controllers/OrdersController";

const router = Router();

router.post("/", OrdersController.Order);

router.get("/:token", OrdersController.OrderState);

export default router;
