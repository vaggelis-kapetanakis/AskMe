import { Router } from "express";
import checkAuth from "../middleware/check-auth";
import notificationsController from "../controllers/notification-controller";

const router = Router();

router.use(checkAuth);

router.delete(
  "/deletenotification",
  notificationsController.deleteNotification
);

export default router;
