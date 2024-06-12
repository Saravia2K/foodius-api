import { Router } from "express";
import RegisterTokenController from "../controllers/RegisterTokenController";
const router = Router();

router.post("/", RegisterTokenController.IndexPOST);

router.get("/:token/is-valid", RegisterTokenController.IsValid);

router.patch("/:token/invalidate", RegisterTokenController.Invalidate);

export default router;
