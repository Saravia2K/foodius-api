import { Router } from "express";
import OrdersController from "../controllers/OrdersController";

const router = Router();

//#region POST
router.post("/", OrdersController.Order);

router.post("/:id/cancel", OrdersController.CancelOrder);
//#endregion

//#region GET
router.get("/:token", OrdersController.OrderState);
//#endregion

//#region PATCH
router.patch("/:id/state", OrdersController.UpdateOrderState);
//#endregion

export default router;
