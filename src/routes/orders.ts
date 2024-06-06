import { Router } from "express";
import OrdersController from "../controllers/OrdersController";

const router = Router();

router.post("/", OrdersController.Order);

router.get("/:token", OrdersController.OrderState);

router.patch("/:id/state", OrdersController.UpdateOrderState);

export default router;
