import { Router } from "express";
import BusinessesController from "../controllers/BusinessesController";
import businessImagesMiddleware from "../middlewares/upload-business-files.middleware";

const router = Router();

//#region POST
router.post("/login", BusinessesController.Login);

router.post(
  "/",
  businessImagesMiddleware,
  BusinessesController.RegisterBusiness
);
//#endregion

//#region GET
router.get("/:slug", BusinessesController.GetInfo);

router.get("/:id/food", BusinessesController.GetBusinessFood);

router.get("/:id/dashboard", BusinessesController.GetInfoForDashboard);

router.get("/:id/orders", BusinessesController.GetBusinessOrders);

router.get("/:day/:time", BusinessesController.GetBusiness);
//#endregion

export default router;
