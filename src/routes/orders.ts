import { Router } from "express";
import OrdersController from "../controllers/OrdersController";

const router = Router();

router.post("/", OrdersController.Order);

router.get("/:id", OrdersController.OrderState);

export default router;